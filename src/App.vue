<script setup>
// 確認する場合は、↓のimportのfrom部分を確認したいファイルに変更する。
import { Toilet_table_data } from "./components/data/Toilet_table_data.js";
//import TopPage from "./components/User/User_detail_page.vue";
import {firebaseauth} from './firebase/usesignup'
import { getAuth } from "firebase/auth";
// import { FireStore } from "./firebase/firestore.js";

</script>

<script>
import { FireStore }  from "./firebase/firestore";

export default {
  mounted(){
    //バックアップ復元用
    // FireStore.Backup_Upload()
  },

  data() {
    return {
      Toilet_table_data,
      FireStore,
    };
  },

  methods:{
          //ユーザ登録
          async logout(){
              await firebaseauth.logout();
              alert('ログアウト')
          },
      },

  }


</script>



//クリックしょりログアウトする

<template>
  <v-sheet>
    <v-app>
      <v-app-bar color="#cdf9b8" elevation="3">
        <v-app-bar-title> toilet </v-app-bar-title>
        <template v-slot:append>
          <v-btn v-if="firebaseauth.login_log==false"
          color="black" elevation="1" rounded onclick="location.href='./Admin/Admin_login'">管理者ログイン
          </v-btn>
          <v-btn v-if="firebaseauth.login_log==true" 
          @click="logout"
          color="black" elevation="1" rounded>ログアウト
          </v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <router-view />
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
  padding-top: 35px;
}
</style>
