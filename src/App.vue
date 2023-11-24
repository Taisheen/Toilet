<script setup>
//import HelloWorld from './components/HelloWorld.vue'
// 確認する場合は、↓のimportのfrom部分を確認したいファイルに変更する。
import TestPage from "./components/User/User_basic_page.vue";
</script>

<template>
  <v-sheet>
    <v-app>
      <v-app-bar color="#cdf9b8" elevation="3">
        <v-app-bar-title> toilet </v-app-bar-title>
        <template v-slot:append>
          <v-btn color="black" elevation="1" rounded>管理者ログイン</v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <router-view> </router-view>
      </v-main>
    </v-app>
  </v-sheet>
</template>


<style scoped>
.v-app-bar-title {
  font-size: 35px;
  color: #a5a5a5;
  text-shadow: 2px 3px #bbb;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #cdcdcd;
}
.v-btn {
  background-color: #ffffff;
}
.v-main {
  background-image: url(./assets/bg.avif);
  background-size: cover;
}
</style>
