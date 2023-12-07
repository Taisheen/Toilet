<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：トイレマークを押した後のページ
-->
<script setup>
import router from "../../router"
</script>

<script>
//import Toilet_table from "../Toilet_table.vue";
import {Toilet_table_data}  from "../data/Toilet_table_data";
export default {
  data() {
    return {
      Toilet_table_data,
    };
  },
};
</script>


<template>
  <v-main>
    <div id="building_container">
      <div id="building_name">
        {{ Toilet_table_data.Buildings[0].building_name }}1階
      </div>
      <table border="1" id="building_table">
        <span
          v-for="item in Toilet_table_data.Toilet_table_items_detail"
          :key="item.building_number_detail"
        >
          <tr id="building_number">
            <td>{{ item.building_number_detail }}</td>
          </tr>
          <tr id="building_image">
            <td>
              <button
                :id="'button' + item.button_id"
                @click="router.push('/User_detail_page')"
              >
                <img :src="item.image_url" />
              </button>
            </td>
          </tr>
        </span>
      </table>
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

  #building_table {
    border-radius: 10px;
    border-color: black;
    border-style: solid;
    border-width: 3px;
    background-color: white;
    margin: auto;
    white-space: nowrap;
  }

  #building_number {
    font-family: "Noto Sans JP", sans-serif;
    font-size: 20px;
    background-color: white;
  }
  #building_image:hover {
    position: relative;
    top: 2pt;
    left: 1pt;
  }

  img {
    width: 50px;
    height: 50px;
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

  #building_table {
    border-radius: 10px;
    border-color: black;
    border-style: solid;
    border-width: 3px;
    background-color: white;
    margin: auto;
    white-space: nowrap;
  }

  #building_number {
    font-family: "Noto Sans JP", sans-serif;
    font-size: 20px;
    background-color: white;
  }
  #building_image:hover {
    position: relative;
    top: 2pt;
    left: 1pt;
  }

  img {
    width: 75px;
    height: 75px;
  }

  .building-image button img {
    max-width: 50px;
    height: auto;
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

  #building_table {
    border-radius: 10px;
    border-color: black;
    border-style: solid;
    border-width: 3px;
    background-color: white;
    margin: auto;
    white-space: nowrap;
  }

  #building_number {
    font-family: "Noto Sans JP", sans-serif;
    font-size: 20px;
    background-color: white;
  }
  #building_image:hover {
    position: relative;
    top: 2pt;
    left: 1pt;
  }

  img {
    width: 100px;
    height: 100px;
  }

  .building-image button img {
    max-width: 50px;
    height: auto;
  }
}
</style>