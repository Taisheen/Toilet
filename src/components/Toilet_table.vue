<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：
-->

<script setup>
import { ref, onMounted } from "vue";
const items = ref([
  { building_number: "1階", image_url: "src/assets/Toilet_icon_blue.png" },
  { building_number: "2階", image_url: "src/assets/Toilet_icon_blue.png" },
  { building_number: "3階", image_url: "src/assets/Toilet_icon_pink.png" },
  { building_number: "4階", image_url: "src/assets/Toilet_icon_blue.png" },
  { building_number: "5階", image_url: "src/assets/Toilet_icon_pink.png" },
  { building_number: "6階", image_url: "src/assets/Toilet_icon_blue.png" },
  { building_number: "7階", image_url: "src/assets/Toilet_icon_pink.png" },
]);
</script>

<template>
  <v-main>
    <div id="building_container">
      <div id="building_name">1号館</div>
      <table border="1" id="building_table">
        <span v-for="item in items" :key="item.building_number">
          <tr id="building_number">
            <td>{{ item.building_number }}</td>
          </tr>
          <tr id="building_image">
            <td>
              <button><img :src="item.image_url" /></button>
            </td>
          </tr>
        </span>
      </table>
    </div>
    <div id="building_container">
      <div id="building_name">2号館</div>
      <table border="1" id="building_table">
        <span v-for="item in items" :key="item.building_number">
          <tr id="building_number">
            <td>{{ item.building_number }}</td>
          </tr>
          <tr id="building_image">
            <td>
              <button><img :src="item.image_url" /></button>
            </td>
          </tr>
        </span>
      </table>
    </div>
    <div id="building_container">
      <div id="building_name">3号館</div>
      <table id="building_table">
        <span v-for="item in items" :key="item.building_number">
          <tr id="building_number">
            <td>{{ item.building_number }}</td>
          </tr>
          <tr id="building_image">
            <td>
              <button><img :src="item.image_url" /></button>
            </td>
          </tr>
        </span>
      </table>
    </div>
  </v-main>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap");
@media screen and (max-width: 500px){
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    max-width: 100%;
    text-align: center;
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

@media screen and (max-width: 700px) and (min-width: 500px){
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    max-width: 100%;
    text-align: center;
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