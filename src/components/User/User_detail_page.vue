<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：トイレマークを押した後のページ
-->
<script setup>
import router from "../../router";
</script>

<script>
import { Toilet_table_data } from "../data/Toilet_table_data";
import { FireStore } from "../../firebase/firestore";
export default {
  mounted() {
    FireStore.getData();
  },
  data() {
    return {
      Toilet_table_data,
      FireStore,
    };
  },
};
</script>


<template>
  <v-main>
    <div id="building_container">
      <div id="building_name">
        {{ FireStore.Toilet_table_items_db.buildings[FireStore.Index1].name }}
      </div>
      <div
        id="building_floors"
        v-for="floors in FireStore.Toilet_table_items_db.buildings[
          FireStore.Index1
        ].floors[FireStore.Index2].sensors"
        :key="floors"
      >
        {{ floors.name }}
        <button id="Toilet_button">
          <img src="../../assets/Toilet_icon_blue.png" />
        </button>
      </div>
    </div>
    <div id="floormap_container">
      <div id="floormap">
        <h2>フロア図</h2>
        <img
          :src="
            FireStore.Toilet_table_items_db.buildings[FireStore.Index1].floors[
              FireStore.Index2
            ].imagePass
          "
        />
      </div>
    </div>
    <div id="memo_container">
      <div id="memo">
        <h2>補足情報</h2>
        <h4>
        {{
          FireStore.Toilet_table_items_db.buildings[FireStore.Index1].floors[
            FireStore.Index2
          ].memo
        }}
        </h4>
      </div>
    </div>
  </v-main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap");
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
  #building_floors {
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
  #Toilet_button img {
    height: 100px;
    width: 115px;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  #Toilet_button img:hover {
    transform: translateY(2.5px);
  }
  #floormap_container {
    height: 450px;
    width: 370px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 30px;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
  }
  #floormap {
    font-family: "Noto Sans JP", sans-serif;
  }
  #memo_container {
    height: 450px;
    width: 370px;
    margin: auto;
    padding: 20px;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
  }
  #memo{
    font-family: "Noto Sans JP", sans-serif;
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

  #building_floors {
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

  #Toilet_button img {
    height: 100px;
    width: 115px;
    padding: auto;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  #Toilet_button img:hover {
    transform: translateY(2.5px);
  }
  #floormap_container {
    height: 450px;
    width: 370px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 30px;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
  }
  #floormap {
    font-family: "Noto Sans JP", sans-serif;
  }
  #memo_container {
    height: 450px;
    width: 370px;
    margin: auto;
    margin-top: 30px;
    padding: 20px;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
  }
  #memo{
    font-family: "Noto Sans JP", sans-serif;
  }
  
}
@media screen and (min-width: 701px) {
  /* 701px以上に適用されるCSS（PC用） */
  #building_container {
    margin: auto;
    margin-bottom: 40px;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }

  #Toilet_button img {
    width: 170px;
    height: 150px;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    transition: 0.3s;
  }

  #Toilet_button img:hover {
    transform: translateY(2.5px);
  }
  #building_floors {
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

  #floormap_container {
    height: 500px;
    width: 400px;
    margin: auto;
    margin-bottom: 20px;
    padding: 40px;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
  }
  #floormap {
    font-family: "Noto Sans JP", sans-serif;
  }
  #memo_container {
    height: 500px;
    width: 400px;
    margin: auto;
    padding: 40px;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
  }
  #memo{
    font-family: "Noto Sans JP", sans-serif;
  }
}
</style>