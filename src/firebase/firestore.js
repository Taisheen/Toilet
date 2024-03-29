// 作成者：平山太陽
import { ref, reactive } from "vue";
import {getFirestore , doc, getDoc,getDocs,query,where,setDoc,updateDoc,arrayUnion, collection, addDoc} from "firebase/firestore";

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { firebaseauth } from "./usesignup";
import router from "../router";
import { QRCode } from "qrcode";

export const FireStore = reactive({

    //firebaseから取得したデータを格納する変数
    Toilet_table_items_db: [],

    Sensors_db:[],

    //firebaseから取得するID
    // Toilet_ID: "mJWV67TP4brb6Iw0t3OP", //仮用のID
    Toilet_ID: "",

    //選択された建物のインデックス
    Select_Building:0,

    //選択された階層のインデックス
    Select_Floors:1,

    //選択されたsensorのインデックス
    Select_Sensor:null,

    //ローディング中かどうか
    is_loading: false,

    //firebaseからデータ(Toiletコレクション)を取得する関数
    async getData() {
      this.is_loading = true;
      //idが空、””の場合、処理を終了
      if(this.Toilet_ID == "" || this.Toilet_ID == null) {
        this.is_loading = false;
        alert("IDが空です")
        return;
      }
      const db = getFirestore()
      console.log("データを取得・・・・・・・・：", this.Toilet_ID);
      //firebaseからデータを取得
      const docRef = doc(db, "Toilet", this.Toilet_ID);
      const sensorRef = collection(db, "Sensor");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          //firebaseから取得したデータを格納
          this.Toilet_table_items_db = docSnap.data();

          //Sensorコレクションのデータを取得 クエリでidがToilet_IDのものを取得
          const q = query(sensorRef, where("id", "==", this.Toilet_ID));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            //取得したデータを格納
            this.Sensors_db.push(doc.data());
          });

          //ToiletのデータにSensorのデータを追加する
          this.Toilet_table_items_db.buildings.forEach((building) => {
            building.floors.forEach((floor) => {
              floor.floorOccupied = false;
              floor.sensors.forEach((sensor) => {
                //Sensorのデータを追加する
                //追加するのはsensorsの配列内のidとSensors_dbのidが一致するものを追加する
                //isOccupiedに関してはsensorStatusがfalseの場合はfalseにする
                //Toilet_table_items_dbにisOccupiedとsensorStatusは存在しないため、追加する
                this.Sensors_db.forEach((sensor_db) => {
                  // console.log(sensor_db.sensor_id);
                  if(sensor.id == sensor_db.sensor_id){
                    sensor.isOccupied = sensor_db.isOccupied;
                    if(sensor_db.sensorStatus == false){
                      sensor.isOccupied = false;
                    }
                    sensor.sensorStatus = sensor_db.sensorStatus;
                    //floorOccupiedを追加する floor内のsensors配列内のisOccupied,がtrueのものが１つでもある場合、floorOccupiedをtrueにする 逆にfalseしかない場合はfalse
                    if(sensor.isOccupied == true){
                      floor.floorOccupied = true;
                    }
                  }
                })
              })
            })
          })
          console.log("取得データ", this.Toilet_table_items_db);
          this.is_loading = false;
      } else {
        this.is_loading = false;
        console.log("ドキュメントの取得に失敗しました・存在しないドキュメントです");
      }
    },

    //ログインしている管理者のToiletドキュメントを取得する関数
    async getAdminData(){
      this.is_loading = true;
      try{
        //firebaseからデータを取得
        const db = getFirestore()
        console.log("check：", firebaseauth.currentUser.uid);
        //ドキュメント内のidがfirebaseauth.currentUser.uidのものを取得
        const q = query(collection(db, "Toilet"), where("id", "==", firebaseauth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //取得したデータを格納
          this.Toilet_ID = doc.id;
        });
        this.is_loading = false;
      }catch(error){
        this.is_loading = false;
        console.log("ドキュメントの取得に失敗しました・存在しないドキュメントです");
      }
      
    },

    //Firestoreに施設情報を追加する関数
    async createData(buildings) {
      this.is_loading = true;
      //送られたbuildingsデータを一時的に格納する変数
      let old_data = buildings;

      //テスト用の確認データ
      // let old_data = [
      //   {
      //     building_name: "2号館",
      //     floors:[
      //       {
      //         name: "2階",
      //         num: 2,
      //       },
      //       {
      //         name: "3階",
      //         num: 2,
      //       },
      //     ]
      //   },
      //   {
      //     building_name: "3号館",
      //     floors:[
      //       {
      //         name: "1階",
      //         num: 2,
      //       },
      //       {
      //         name: "2階",
      //         num: 2,
      //       },
      //     ]
      //   },
      // ]


      //Firestoreに送るデータ
      let upload_data = {};

      /*
      送られてくるデータの形式を下記backup_dataの形式に合わせる
      送られるデータは以下の形式
      buildings:[
        {
          building_name: "2号館",
          floors:[
            {
              name: "2階",
              num: 2,
            },
            {
              name: "3階",
              num: 2,
            },
          ]
        },
        {
          building_name: "3号館",
          floors:[
            {
              name: "1階",
              num: 2,
            },
            {
              name: "2階",
              num: 2,
            },
          ]
        },
        {
          building_name: "4号館",
          floors:[
            {
              name: "1階",
              num: 2,
            },
            {
              name: "2階",
              num: 2,
            },
          ]
        },
      ]
      */
     //送られたデータをFirestoreの形式に合わせる　floorsのnumの数だけsensorを追加する　sensorのidは空にする
      upload_data = {
        buildings: old_data.map((building) => {
          return {
            name: building.building_name,
            floors: building.floors.map((floor) => {
              return {
                name: floor.name,
                memo: "",
                imagePass: "",
                sensors: Array.from({length:floor.num}, (v, k) => {
                  return {
                    name: (k+1).toString(),
                    //idには一意のランダムな文字列を格納する
                    id:crypto.randomUUID()
                  }
                })
              }
            })
          }
        }),
        id:firebaseauth.currentUser.uid,
        // id:"これはテスト用だよ！",
      }
      
      //Firestoreにデータを送信
      const db = getFirestore()
      //コレクションの参照を作成
      const collectionRef = collection(db, "Toilet");

      //追加したドキュメントのIDを格納する変数
      let add_id = ""
      //FirestoreのToiletコレクションにデータを追加
      await addDoc(collectionRef, upload_data).then((docRef) => {
        // alert("追加しました")
        console.log("追加されたドキュメントID: ", docRef.id);
        //追加したドキュメントのIDを格納
        // add_id = docRef.id;
        this.Toilet_ID = docRef.id;
        // this.is_loading = false;
      }).catch((error) => {
        console.error("エラー発生aaaa・データの追加に失敗しました： ", error);
        this.is_loading = false;
      });

      //Sensorコレクションに上記のsensorsの数だけドキュメントを追加、作成したドキュメントのIDを対応するsensorsのidに格納
      /*
      Sensorコレクションの形式
      {
        name: "1-1", //上記のsensorsのnameを格納
        isOccupied:false,
        sensorStatus:false,
        toilet_id: "1xdrKSi0yDQcXL6p89oR" //上記で作成したドキュメントのIDを格納
      }
      */
      // 書き込み回数が多いため、念のためコメントアウト
      const sensorRef = collection(db, "Sensor");
      console.log("Sensorコレクションにデータを追加・・・・・・・・");
      upload_data.buildings.forEach((building) => {
        building.floors.forEach((floor) => {
          floor.sensors.forEach((sensor) => {
            //あらかじめ生成したidを基にSensorコレクションにデータを追加
            setDoc(doc(sensorRef, sensor.id), {
              isOccupied:false,
              sensorStatus:false,
              id: this.Toilet_ID,
              sensor_id: sensor.id
            }).then((docRef) => {
              // console.log("追加されたドキュメントID: ", docRef.id);
            }).catch((error) => {
              console.error("エラー発生・データの追加に失敗しました： ", error);
            });

            // addDoc(sensorRef, {
            //   name: sensor.name,
            //   isOccupied:false,
            //   sensorStatus:false,
            //   id: this.Toilet_ID,
            //   sensor_id: sensor.id
            // }).then((docRef) => {
            //   console.log("追加されたドキュメントID: ", docRef.id);
            // }).catch((error) => {
            //   console.error("エラー発生・データの追加に失敗しました： ", error);
            // });
          })
        })
      })
      this.is_loading = false;
      router.push("/Admin_page");
    },

    //QRコードを生成する関数
    async createQRcode() {
      
    },


    //センサーの稼働状況を変更する関数
    async changeSensorStatus(id,change){
      this.is_loading = true;
      let change_value = false;
      //SensorコレクションのsensorStatusを変更する
      if(change == 0){
        change_value = true;
      }
      try {
        const db = getFirestore()
        const docRef = doc(db, "Sensor", id);
        await updateDoc(docRef, {
          sensorStatus: change_value
        });
        await this.getData();
        this.Select_Sensor = null;
        this.is_loading = false;
        alert("変更しました")
      }  catch (error) {
        this.Select_Sensor = null;
        this.is_loading = false;
        console.error('データの更新に失敗しました:', error.message);
      }
    },

    //Firestoreに施設情報を追加・変更する関数
    async updateDetail(selectedImage,addmemo){
      this.is_loading = true;
      //アップロードされた画像のパスを格納する変数
      let imagePass = null;

      //最新のデータを取得
      await this.getData().then(async () => {
        try {
          //選択された画像がある場合、画像をアップロード
          if(selectedImage){
            // Storageの参照を作成
            const storage = getStorage();
            const storageReference = storageRef(storage, 'Admin/'+firebaseauth.currentUser.uid+'/' + Date.now());

            // ImagePickerで選択された画像がファイルURIの場合、putメソッドを使用してアップロード
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            await uploadBytes(storageReference, blob);

            // アップロードした画像のパスを取得
            imagePass = await getDownloadURL(storageReference);
            // alert("更新しました")
            console.log('ファイルのアップロードに成功しました');
          }

          //送られたデータを一時的に格納する変数
          let data = this.Toilet_table_items_db;
          console.log(addmemo)
          console.log(this.Select_Building)
          console.log(this.Select_Floors)

          //選択された建物と階層のフロアのメモを更新
          data.buildings[this.Select_Building].floors[this.Select_Floors].memo = addmemo;
          console.log(data)
          //選択された建物と階層のフロアの画像パスを更新(ある場合のみ)
          if(imagePass){
            data.buildings[this.Select_Building].floors[this.Select_Floors].imagePass = imagePass;
          }

          //更新したデータをFirestoreに送信
          const db = getFirestore()
          const docRef = doc(db, "Toilet", this.Toilet_ID);
          await updateDoc(docRef, data);
          alert("更新しました")
          this.is_loading = false;
        } catch (error) {
          this.is_loading = false;
          console.error('データの更新に失敗しました:', error.message);
        }
      })
      // const user=firebaseauth.currentUser.uid
      // if (user) {
        // this.Toilet_ID
        // const db = getFirestore()

        // 更新対象のドキュメントへのパスを構築
        // const docRef = doc(db, "Toilet", this.Toilet_ID);

        // フォームをリセット
        // this.newMemo = { content: "" };
      // } else {
        // ユーザーがログインしていない場合の処理
        // console.error("User not authenticated.");
      // }
    },

    //ログアウト時にデータを初期化する関数
    logout(){
      this.Toilet_table_items_db = [];
      this.Sensors_db = [];
      this.Toilet_ID = "";
      this.Select_Building = 0;
      this.Select_Floors = 1;
      this.Select_Sensor = null;
      this.is_loading = false;
    },







    /* バックアップ用　データ消失時にコメントを解除、App.vueのコメントアウトを解除することで下記データを書き込み可能 */
    
    //バックアップ用のデータを格納する変数
    /*
    backup_data:{
      buildings:[
        {
          name: "2号館",
          floors:[
            {
              name: "2階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F2goukan2f.png?alt=media&token=60cabe1a-14a2-4f27-80cf-59d214811f5d",
              sensors:[
                {
                  name: "2-1",
                  id: "1xdrKSi0yDQcXL6p89oR"
                },
                {
                  name: "2-2",
                  id: "60MeSD1Cqy4xYEnscpD3"
                }
              ]
            },
            {
              name: "3階",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F2goukan3f.png?alt=media&token=a3ce59a1-863d-4dfa-909c-a132ecde1929",
              memo: "ウォシュレット有り",
              sensors: [
                {
                  "id": "71g1ciRnYnt0Re9Vk9yp",
                  "name": "3-1"
                },
                {
                  "name": "3-2",
                  "id": "cwxHEAAuA5AovbAFDpbr"
                }
              ]
            },
            {
              name: "4階",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F2goukan4f.png?alt=media&token=afa8c6d6-6f7d-46d3-8152-dd7a18888208",
              memo: "ウォシュレット有り",
              sensors: [
                {
                  id: "60MeSD1Cqy4xYEnscpD3",
                  name: "4-1"
                },
                {
                  name: "4-2",
                  id: "60MeSD1Cqy4xYEnscpD3"
                }
              ]
            },
            {
              name: "5階",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F2goukan5f.png?alt=media&token=d9c8ba83-bd7e-47a7-9a7d-f58b06108d39",
              memo: "ウォシュレット有り",
              sensors: [
                {
                  name: "5-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  id: "71g1ciRnYnt0Re9Vk9yp",
                  name: "5-2"
                }
              ]
            },
            {
              name: "6階",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F2goukan6f.png?alt=media&token=788002a7-f55f-47c2-bf5e-7e4698980e00",
              memo: "ウォシュレット有り",
              sensors: [
                {
                  name: "6-1",
                  id: "60MeSD1Cqy4xYEnscpD3"
                },
                {
                  id: "71g1ciRnYnt0Re9Vk9yp",
                  name: "6-2"
                }
              ],
            }
          ],
        },

        {
          name: "3号館",
          floors:[
            {
              name: "1階",
              memo: "身障者用トイレ",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan1f.png?alt=media&token=4ad71e69-cbdc-4423-858a-fc8fa74e770b",
              sensors:[
                {
                  name: "1-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "1-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "2階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan2f.png?alt=media&token=82b77847-e88a-468f-8c0d-9f1fb88520c5",
              sensors:[
                {
                  name: "2-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "2-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "3階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan3f.png?alt=media&token=5b89d95c-0fbb-4c85-82ac-bacc13b43999",
              sensors:[
                {
                  name: "3-1",
                  id: "60MeSD1Cqy4xYEnscpD3"
                },
                {
                  name: "3-2",
                  id: "60MeSD1Cqy4xYEnscpD3"
                }
              ]
            },
            {
              name: "4階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan4f.png?alt=media&token=9e81f7bf-96e9-4bcd-ae3d-9742ab589006",
              sensors:[
                {
                  name: "4-1",
                  id: "60MeSD1Cqy4xYEnscpD3"
                },
                {
                  name: "4-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "5階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan5f.png?alt=media&token=c0b8bcfd-6d4c-4c80-8e68-b20785bab81a",
              sensors:[
                {
                  name: "5-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "5-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "6階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan6f.png?alt=media&token=3e1f1c77-c670-415f-9cf0-4ac2a65ff492",
              sensors:[
                {
                  name: "6-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "6-2",
                  id: "60MeSD1Cqy4xYEnscpD3"
                }
              ]
            },
            {
              name: "7階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F3goukan7f.png?alt=media&token=be4afbd7-17a6-4e98-9dbd-467792fd6e8a",
              sensors:[
                {
                  name: "7-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "7-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
          ],
        },

        {
          name: "4号館",
          floors:[
            {
              name: "1階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F4goukan1f.png?alt=media&token=15839805-9cee-430e-826f-ae36a60f8f04",
              sensors:[
                {
                  name: "1-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "1-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "2階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F4goukan2f.png?alt=media&token=bec4d9cb-171d-45b3-b8dc-8c008df89968",
              sensors:[
                {
                  name: "2-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "2-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "3階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F4goukan3f.png?alt=media&token=265568a2-de38-436c-af74-b7e329f5efb7",
              sensors:[
                {
                  name: "3-1",
                  id: "60MeSD1Cqy4xYEnscpD3"
                },
                {
                  name: "3-2",
                  id: "60MeSD1Cqy4xYEnscpD3"
                }
              ]
            },
            {
              name: "4階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F4goukan4f.png?alt=media&token=bf8e928a-33f5-447d-bb01-4497458f9833",
              sensors:[
                {
                  name: "4-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "4-2",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                }
              ]
            },
            {
              name: "5階",
              memo: "ウォシュレット有り",
              imagePass: "https://firebasestorage.googleapis.com/v0/b/painappuru-toilet.appspot.com/o/Admin%2F82FKuYOWAyXQV87fVVjhXHDwATh2%2F4goukan5f.png?alt=media&token=78b94f93-3a8a-4f63-976d-973d3b641198",
              sensors:[
                {
                  name: "5-1",
                  id: "71g1ciRnYnt0Re9Vk9yp"
                },
                {
                  name: "5-2",
                  id: "60MeSD1Cqy4xYEnscpD3"
                }
              ]
            }
          ],
        },
      ],
      id:"82FKuYOWAyXQV87fVVjhXHDwATh2"
    },

    async Backup_Upload(){
      const db = getFirestore()
      const docRef = doc(db, "Toilet", this.Toilet_ID);
      // const docRef = doc(db, "Toilet", "mJWV67TP4brb6Iw0t3OP");
      await setDoc(docRef, this.backup_data);
    },
    */
    
    
})