<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：表のテンプレート
-->

<script setup>
import router from "../router";
import blueImgSrc from "../assets/Toilet_icon_blue.png";
import redImgSrc from "../assets/Toilet_icon_pink.png";
</script>

<script>
import {Toilet_table_data}  from "./data/Toilet_table_data";
import { FireStore }  from "../firebase/firestore";
export default {
  mounted(){
    //パラメータから値を取得し、FireStore.Toilet_Idに代入
    //:がある場合は、パラメータを取得する、その場合、:が含まれてしまうので、replaceで削除
    if(this.$route.params.id != undefined){
      FireStore.Toilet_ID = this.$route.params.id.replace(":","")
      // FireStore.Toilet_table_items_dbにデータを代入
      this.is_loding = true
      FireStore.getData().then(() => {
        this.is_loding = false
      })
      this.is_loding = false
    }else{
      // パラメータがない場合
      alert("パラメータがありません")
    }
  },
  data() {
    return {
      Toilet_table_data,
      FireStore,
      is_loding: true,
      //表示する画像のパス　floors.floorOccupiedがtrueの場合、blue、falseの場合、pink
      // blue_img: require("../assets/Toilet_icon_blue.png"),
      // red_img: require("../assets/Toilet_icon_pink.png"),
    };
  }, 
  methods:{
    GetIndex:function(index1,index2){
      FireStore.Index1 = index1,
      FireStore.Index2 = index2
      //パラメータを付けて、遷移
      // router.push('/User_detail_page')
      router.push('/User_detail_page:' + FireStore.Toilet_ID)
    }
  }
};
</script>
<template>
  <v-main v-if="!FireStore.is_loading">
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
}
</style>