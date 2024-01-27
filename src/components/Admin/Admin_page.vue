<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：管理者がトイレの状況を確認できる
-->

<script setup>
import router from "../../router";
import blueImgSrc from "../../assets/Toilet_icon_blue.png";
import redImgSrc from "../../assets/Toilet_icon_pink.png";
// const qrcode_value = ref('');  // ref に変更し、初期値を設定する  
</script>

<script>
import { FireStore }  from "../../firebase/firestore";
import VueQrcode from "@chenfengyuan/vue-qrcode";
export default {
  mounted(){
    if(FireStore.Toilet_ID == ""){
      FireStore.getAdminData()
    }
    // FireStore.getAdminData()
    FireStore.getData()
  },
  components: {
    VueQrcode
  },
  data() {
    return {
      FireStore,
      qrcode_value: "",
      option: {
        errorCorrectionLevel: "M",
        maskPattern: 0,
        margin: 10,
        scale: 2,
        width: 300,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF"
        }
      }
    };
  }, 
  methods:{
    GetIndex:function(index1,index2){
      FireStore.Select_Building = index1,
      FireStore.Select_Floors = index2
      console.log(FireStore.Select_Building)
      console.log(FireStore.Select_Floors)
      router.push('/Admin_edit_detail')
    },
    // QRコードを生成する
    generate:function(){
      this.qrcode_value = "https://painappuru-toilet.web.app/User_basic_page:"+FireStore.Toilet_ID
      console.log(this.qrcode_value)
      //この関数を呼び出すと引数に渡した画像をStorageにアップロードする
      // FireStore.uploadQRcode(this.qrcode_value)
    }
  }
};
</script>
<template>
  <v-main v-if="!FireStore.is_loading" >
    <!-- QRコードがdbにない場合生成するボタンを表示する -->
    <div id="QR_domain_container" v-if="qrcode_value">
      <div id="QR_domain">
        <p>QRコード</p>
      </div>
      <div id="QR_code">
        <VueQrcode v-if="qrcode_value" :value="qrcode_value" :options="option" tag="img" id="QR_code"></VueQrcode>
      </div>
    </div>
    <button id="QR_button" @click="generate" v-else>表示用QRコードを生成する</button>
    <div id="building_container" v-for="(buildings, index1) in FireStore.Toilet_table_items_db.buildings" :key="buildings">
      <div id="building_name">
       {{buildings.name}}
      </div>
      <div id="building_floors" v-for="(floors , index2) in buildings.floors" :key="floors">
        {{floors.name}}
        <button id="Toilet_button" @click= "GetIndex(index1,index2)">
          <!-- 表示する画像は、floors.floorOccupiedがtrueの場合、blue、falseの場合、pink -->
          <img v-if="floors.floorOccupied == false" :src=redImgSrc alt="トイレアイコン">
          <img v-else :src="blueImgSrc" alt="トイレアイコン">
        </button>
      </div>
    </div>
  </v-main>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap");
/* cssリセット */
@media screen and (max-width: 500px) {
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    margin: auto;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }
  #building_floors{
    width: 120px;
    height: 150px;
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  #Toilet_button img{
    height: 100px;
    width: 115px;
    display: block;
    border-top: 2px solid black ;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  #Toilet_button img:hover{
    transform:translateY(2.5px);
  }
  #QR_domain_container{
    border: 2px solid black;
    height: 120px;
    width: 100px;
    margin:auto;
    margin-bottom: 0px;
    background-color:white;
    border-radius: 20px;
  }
  #QR_domain{
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;
  }
  #QR_code{
    width: 80px;
    height: 80px;
    margin: auto;
    /* 中央寄せ */
    display: block;
  }
  #QR_button{
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    border-radius: 10px;
    border: 2px solid black;
    background-color: white;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
    transition: .3s;
    padding: 5px;
  }
  #QR_button:hover{
    transform:translateY(1.5px);
  }
}

@media screen and (max-width: 700px) and (min-width: 500px) {
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    margin: auto;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }
  
  #building_floors{
    width: 120px;
    height: 150px;
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  
  #Toilet_button img{
    height: 100px;
    width: 115px;
    padding: auto;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    
  }
  #Toilet_button img:hover{
    transform:translateY(2.5px);
  }
  #QR_domain_container{
    border: 2px solid black;
    height: 120px;
    width: 120px;
    margin:auto;
    margin-bottom: 0px;
    background-color:white;
    border-radius: 20px;
  }
  #QR_domain{
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;

  }
  #QR_code{
    width: 80px;
    height: 80px;
    margin: auto;
    /* 中央寄せ */
    display: block;
  }
  #QR_button{
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    border-radius: 10px;
    border: 2px solid black;
    background-color: white;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
    transition: .3s;
    padding: 5px;
  }
  #QR_button:hover{
    transform:translateY(1.5px);
  }
  
}
@media screen and (min-width: 701px) {
  /* 701px以上に適用されるCSS（PC用） */
  #building_container {
    margin: auto;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }

  #Toilet_button img{
    width: 170px;
    height: 150px;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius:7px;
    transition: .3s;
  }

  #Toilet_button img:hover{
    transform:translateY(2.5px);
  }
  #building_floors{
    width: 175px;
    height: 200px;
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  #QR_domain_container{
    border: 2px solid black;
    height: 150px;
    width: 150px;
    margin:auto;
    margin-bottom: 0px;
    background-color:white;
    border-radius: 20px;
  }
  #QR_domain{
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;
  }
  #QR_code{
    width: 120px;
    height: 120px;
    margin: auto;
    /* 中央寄せ */
    display: block;
  }
  #QR_button{
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    border-radius: 10px;
    border: 2px solid black;
    background-color: white;
    font-size: 20px;
    font-family: "Noto Sans JP", sans-serif;
    transition: .3s;
    padding: 5px;
  }
  #QR_button:hover{
    transform:translateY(1.5px);
  }
}
</style>