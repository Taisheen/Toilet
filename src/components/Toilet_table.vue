<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：表のテンプレート
-->

<script setup>
import router from "../router";
</script>

<script>
import {Toilet_table_data}  from "./data/Toilet_table_data";
import { FireStore }  from "../firebase/firestore";
export default {
  mounted(){
    FireStore.getData()
  },
  data() {
    return {
      Toilet_table_data,
      FireStore
    };
  }, 
  //画像ファイル
  asset:[
    { unused: "src/assets/Toilet_icon_blue.png" },
    { used: "src/assets/Toilet_icon_pink.png" }
  ]
};
</script>
<template>
  <v-main>
    <div id="building_container" v-for="buildings in FireStore.Toilet_table_items_db.buildings" :key="buildings">
      <div id="building_name">
       {{buildings.name}}
      </div>
      <div id="building_floors" v-for="floors in buildings.floors" :key="floors">
        {{floors.name}}
      </div>
      <p></p>
      <div id="Toilet_image" v-for="Toilet in buildings.floors" :key="Toilet">
        <img src="src/assets/Toilet_icon_blue.png">
      </div>
    </div>
  </v-main>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap");
@media screen and (max-width: 500px) {
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    max-width: 100%;
    text-align: center;
    overflow-x: auto;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }
  #building_floors{
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    padding: 0px 50px;
    border: 2px solid black;
    background-color: white;
  }
  #Toilet_image img{
    height: 100px;
    width: 100px;
    padding: auto;
    margin: 2px;
  }
  #Toilet_image{
    display: inline-block;
  }
}

@media screen and (max-width: 700px) and (min-width: 500px) {
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    max-width: 100%;
    text-align: center;
    overflow-x: auto;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }
  #building_floors{
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    padding: 0px 50px;
    border: 2px solid black;
    background-color: white;
  }
  #Toilet_image img{
    height: 100px;
    width: 100px;
    padding: auto;
    margin: 2px;
  }
  #Toilet_image{
    display: inline-block;
  }
}
@media screen and (min-width: 701px) {
  /* 701px以上に適用されるCSS（PC用） */
  #building_container {
    max-width: 100%;
    text-align: center;
    overflow-x: auto;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }

  #building_floors{
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    padding: 0px 50px;
    border: 2px solid black;
    background-color: white;
    flex: 1;
  }

  #Toilet_image img{
    height: auto;
    width: 150px;
    padding: auto;
    margin: 1px;
  }
  #Toilet_image{
    display: inline-block;
  }
 
}
</style>