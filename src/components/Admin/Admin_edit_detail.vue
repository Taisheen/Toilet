<!-- 
  作成者：兼松剛
  変更者：兼松剛
  画面概要：管理者編集詳細画面
-->

<script setup>
import { FireStore } from "../../firebase/firestore";
import blueImgSrc from "../../assets/Toilet_icon_blue.png";
import redImgSrc from "../../assets/Toilet_icon_pink.png";
import yellowImgSrc from "../../assets/Toilet_icon_yellow1.png"
import router from "../../router";
</script>

<script>
export default {
  mounted(){
    console.log(FireStore.Select_Building)
    console.log(FireStore.Select_Floors)

  },
  data() {
    return {
      selectedImage: null,
      elements: [],
      FireStore,
      selectindex: "",
      addmemo: "",
    };
  },
  methods: {
    //トイレの個数増減
    addElement() {
      
    },
    removeElement() {
      if (this.elements.length > 0) {
        this.elements.pop();
      }
    },

    //トイレアイコンが押されたときの処理
    selectIndex(index) {
      //すでに選択されている場合、選択を解除
      if (FireStore.Select_Sensor == index) {
        FireStore.Select_Sensor = null;
      } else {
        FireStore.Select_Sensor = index;
      }
    },

    //状況アイコンが押されたときの処理
    iconSelected(select){
      //Select_Sensorが選択されている場合、状況アイコンを変更
      if(FireStore.Select_Sensor != null){
        if(select == 0){
          //sensorStatusがtrueの場合、何もしない
          if(FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].floors[FireStore.Select_Floors].sensors[FireStore.Select_Sensor].sensorStatus == true){
            return
          }
          FireStore.changeSensorStatus(FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].floors[FireStore.Select_Floors].sensors[FireStore.Select_Sensor].id,select)
        }else if(select == 1){
          //sensorStatusがfalseの場合、何もしない
          if(FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].floors[FireStore.Select_Floors].sensors[FireStore.Select_Sensor].sensorStatus == false){
            return
          }
          FireStore.changeSensorStatus(FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].floors[FireStore.Select_Floors].sensors[FireStore.Select_Sensor].id,select)
        }
      }else{
        alert("トイレを選択してください")
      }
    },

    //ファイル画像表示
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];

      // 画像が選択されていることを確認
      if (file && file.type.startsWith("image/")) {
        // FileReaderを使用して画像を読み込む
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }

      // 選択後に input type="file" 要素をリセット
      this.$refs.fileInput.value = null;
    },
    // async uploadImage() {
    //   if (!this.selectedImage) {
    //     console.error("No file selected.");
    //     return;
    //   }

      //FireStore.update(this.selectedImage);
      // const storage = getStorage();
      // const storageReference = storageRef(storage, 'Admin/' + Date.now());

      // try {
      //   // ImagePickerで選択された画像がファイルURIの場合、putメソッドを使用してアップロード
      //   const response = await fetch(this.selectedImage);
      //   const blob = await response.blob();
      //   await uploadBytes(storageReference, blob);
      //   console.log('File uploaded successfully.');
      // } catch (error) {
      //   console.error('Error uploading file:', error.message);

      async updates() {
      //画像アップロード
      // if (!this.selectedImage) {
      //   console.error('No file selected.');
      //   return;
      // }

      FireStore.updateDetail(this.selectedImage,FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].floors[FireStore.Select_Floors].memo);
    },
  },
};

//画像が押されたときの処理

function Click() {
  // クリック時の動作を指定できます
  location.href = "/Admin_login";
}
</script>

<template>
  <v-main>
    <div id="selected_building_name">
      <h2>
        {{ FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].name }}
        {{
          FireStore.Toilet_table_items_db.buildings[FireStore.Select_Building].floors[
            FireStore.Select_Floors
          ].name
        }}
      </h2>
    </div>

    <v-text class="building-name" name="building-name" placeholder="" />
    <div class="container">
      <!-- <button class="btn" @click="removeElement"><strong>―</strong></button>
      <button class="btn" @click="addElement"><strong>+</strong></button> -->
      <!-- <div class="toilet-container">
        <div
          v-for="(element, index) in FireStore.Toilet_table_items_db.buildings[FireStore.Index1].floors[FireStore.Index2].sensors"
          :key="index"
          class="rounded-container"
        >
          <input
            class="toilet-stairs-name"
            type="text"
            :placeholder="index + 2 + '室 '"
            v-model="element.name"
          />
          <img
            src="../../assets/Toilet_icon_blue.png"
            class="img"
            alt="トイレ"
            @click="selectedImage"
          />
        </div>
      </div> -->

      <!-- building_floorsはindexとselectIndexが一致する場合、ボーダーの色を赤にする -->
      <div
        id="building_floors"
        v-for="(floors,index) in FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].sensors"
        :key="floors"
        @click="selectIndex(index)"
        :class="{ 'selected': index == FireStore.Select_Sensor }"
      >
        <input
          class="toilet-stairs-name"
          type="text"
          :placeholder="index + 1 + '室 '"
          v-model="floors.name"
        />
        <button id="Toilet_button">
          <!-- 表示する画像は、floors.isOccupiedがtrueの場合、blue、falseの場合、pink sensorStatusがfalseの場合はyellow -->
          <img v-if="floors.isOccupied == false && floors.sensorStatus == false" :src=yellowImgSrc alt="トイレアイコン">
          <img v-else-if="floors.isOccupied == false" :src=redImgSrc alt="トイレアイコン">
          <img v-else :src="blueImgSrc" alt="トイレアイコン">
        </button>
      </div>
      
    </div>
    <!-- 選択されたセンサーのIDを表示する -->
    <div id="selected_sensor_id">
      <p>選択されたセンサーID：
        <a v-if="FireStore.Select_Sensor != null">{{ FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].sensors[FireStore.Select_Sensor].id}}</a>
      </p>
      
    </div>
    <v-container id="image">
      <v-row>
        <v-col>
          <div id="bt" @click="iconSelected(0)">
            <div class="imgbt-container">
              <img
                src="../../assets/Toilet_icon_blue1.png"
                class="gazou"
                alt="空室"
              />
            </div>
            <v-text style="font-weight: bold">稼働中</v-text>
          </div>
        </v-col>
        <!-- <v-col>
          <div id="bt" @click="iconSelected(0)">
            <div class="imgbt-container">
              <img
                src="../../assets/Toilet_icon_pink1.png"
                class="gazou"
                alt="満室"
              />
            </div>
            <v-text style="font-weight: bold">満室</v-text>
          </div>
        </v-col> -->
        <v-col>
          <div id="bt" @click="iconSelected(1)">
            <div class="imgbt-container">
              <img
                src="../../assets/Toilet_icon_yellow1.png"
                class="gazou"
                alt="故障中"
              />
            </div>
            <v-text style="font-weight: bold">故障中</v-text>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="upload">
      <v-btn @click="openFileInput" color="#cdf9b8"
        >フロアマップ図アップロード</v-btn
      >
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="handleFileChange"
        accept="image/*"
      />
    </v-container>
    <v-img
      id="image-zu"
      v-if="selectedImage != null"
      :src="selectedImage"
      max-width="500"
      max-height="500"
    />
    <v-img
      id="image-zu"
      v-if=" selectedImage == null && 
      FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].imagePass != null &&
        FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].imagePass != undefined &&
        FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].imagePass != ''"
      :src="FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].imagePass"
      max-width="500"
      max-height="500"
    />

    <div id="memof">
      <v-textarea
        id="memo"
        v-model="FireStore.Toilet_table_items_db.buildings[
          FireStore.Select_Building
        ].floors[FireStore.Select_Floors].memo"
        label="メモ"
        variant="solo"
      ></v-textarea>
    </div>

    <v-container>
      <v-row>
        <v-col>
          <div id="back">
            <v-btn
              color="#cdf9b8"
              @click="router.back()"
              >戻る</v-btn
            >
          </div>
        </v-col>
        <v-col>
          <div id="update">
            <v-btn @click="updates" color="#cdf9b8">更新</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap");

#building_floors {
  width: 155px;
  height: 170px;
  text-align: center;
  font-size: 30px;
  font-family: "Noto Sans JP", sans-serif;
  display: inline-block;
  border: 2px solid black;
  background-color: white;
  margin: 2px;
  border-radius: 10px;
}
#building_floors.selected {
  border: 2px solid red;
}
#Toilet_button img {
  width: 150px;
  height: 120px;
  display: block;
  border-top: 2px solid black;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}
/* #Toilet_button img:hover {
  transform: translateY(2.5px);
} */
#selected_sensor_id {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;
  /* 中央揃えにする */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 角丸にする */
  margin: 10px 0px 10px 0px;

}

.buildingtext {
  margin-left: 10%;
  font-weight: bold;
}
.container {
  /* border: 1px solid black; */
  display: flex;
  margin: 2%;
}

.toilet-container {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
}

.rounded-container {
  display: flex;
  flex-direction: column;
  width: 10%;
  /* flex-grow: 1; */
  min-width: 50px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid black;
  border: 1px solid black transparent;
  margin: 0.3rem 0.3rem;
  /* &:hover {
    border: 2px solid black; 
  } */
  background-color: white;
}
.btn {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20%; /* 角丸にすることで円形に見える */
  font-size: 1.3em;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease; /* ホバー時のトランジションを追加 */
  margin: 2.5% 0.6%;
}
.btn:hover {
  background-color: #f0f0f0;
}
.building-name {
  outline: none;
  height: 2em;
  width: 20em;
  border-radius: 10px;
  text-align: center;
  background-color: white;
  margin: 2.5% 0 0 2.5%;
}
.toilet-stairs-name {
  text-align: center;
  width: 150px;
  height: 30px;
  font-size: 26px;
  font-family: "Noto Sans JP", sans-serif;
}

.toilet-stairs-name:focus {
  outline: none;
}

.img {
  border-top: 1px solid black;
  width: 100%;
  height: auto;
}

@media screen and (max-width: 840px) {
  .rounded-container {
    min-width: 66px;
  }
  .imgbt-container {
    min-width: 50px;
  }
  #building_floors {
    width: 115px;
    height: 115px;
    text-align: center;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  #Toilet_button img {
    width: 110px;
    height: 80px;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .toilet-stairs-name {
    text-align: center;
    width: 100px;
    height: 20px;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
  }
}

@media screen and (max-width: 500px) {
  .rounded-container {
    min-width: 50px;
  }
  .imgbt-container {
    min-width: 40px;
  }
  #building_floors {
    width: 95px;
    height: 95px;
    text-align: center;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  #Toilet_button img {
    width: 90px;
    height: 60px;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .toilet-stairs-name {
    text-align: center;
    width: 80px;
    height: 20px;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
  }
}

.container{
 /* 中央揃えにする */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 画面の横幅いっぱいに広げる */

}
.gazou {
  width: 100%;
  height: auto;
  /* ボーダーを四角に設定 */
  /* border: 3px solid black; */
  /* 角丸にする */
  /* border-radius: 10px; */
}
.imgbt-container {
  display: flex;
  flex-direction: column;
  width: 10%;
  border-radius: 10px;
  /* flex-grow: 1; */
  min-width: 100px;
  /* border-radius: 10px; */
  overflow: hidden;
  /* border: 1px solid black transparent; */
  /* &:hover {
    border: 2px solid black; 
  } */
  background-color: white;
  /* margin: 0.3rem 0.3rem; */
}
.imgbt-container:hover {
  border: 3px solid black;
}

#bt {
  display: flex;
  flex-flow: column;
  margin: 5% 10% 0% 10%;
  align-items: center;
}

#upload {
  margin: 5% 30% 0% 20%;
  max-width: 400px;
  align-items: center;
}

#image-zu {
  max-width: 400px;
  margin: 0% 40% 0% 40%;
  align-items: center;
}

#memof {
  margin: 5% 20% 0% 20%;
  max-width: 2000px;
  align-items: center;
}

#back {
  margin: 5% 30% 10% 40%;
  align-items: center;
}

#update {
  margin: 5% 60% 10% 40%;
  align-items: center;
}
#selected_building_name {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;
  margin-left: 30px;
}
</style>