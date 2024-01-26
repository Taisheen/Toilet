<!-- 
  作成者：兼松剛
  変更者：
  画面概要：
-->

<script setup>
//import HelloWorld from './components/HelloWorld.vue'
// 確認する場合は、↓のimportのfrom部分を確認したいファイルに変更する。
//import TestPage from "./components/User/User_basic_page.vue";
import router from "../../router";
//パスワードの奴
import { ref } from 'vue'
import {firebaseauth} from '../../firebase/usesignup'
import { FireStore } from "../../firebase/firestore";

  const rules = {
    required: value => !!value || '必須.',
    min: v => v.length >= 8 || '8文字以上',
    emailMatch: () => (`入力したメールアドレスとパスワードが一致しません`),
  }

  const show1 = ref(false)
  // const password = ref('')
 
</script>

<script >
export default {
    mounted(){
        //画面が表示されたら、入力フォームを空にする
        firebaseauth.email = '';
        firebaseauth.password1 = '';
        // firebaseauth.add_management_user.email = '';
        //既にログインしている場合、管理者画面に遷移
        if(firebaseauth.currentUser != null){
          router.push('/Admin_page')
        }
    },
    data(){
        return{
        }
    },
    methods:{
        //ユーザ登録
        async login(){
          await firebaseauth.login()
        },

    }
}
</script>

<template>
  <v-main v-if="currentUser == null">

    <div id="id">
      メールアドレス
      <v-text-field prepend-inner-icon="mdi-account-circle" variant="solo" v-model="firebaseauth.email"></v-text-field>
    </div>

    <div id="pass">
      パスワード
      <v-text-field height="50px" prepend-inner-icon="mdi-lock" variant="solo" v-model="firebaseauth.password1"            :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append-inner="show1 = !show1">
      </v-text-field>
    </div>

    <div id="login">
      <v-btn block id="button" height="50" color="#cdf9b8"  variant="flat" @click="login">ログイン</v-btn>

    </div>

    <div id="sign">
        <router-link to="/Admin_signup">新規登録</router-link>
    </div>
  </v-main>
</template>


<style scoped>

#id {
  margin: 5% 30% 5% 30%;
  max-width: 600px;
}

#pass {
  margin: 0% 30% 5% 30%;
  max-width: 600px;
}

#login {
  margin: 0% 30% 0% 30%;
  max-width: 600px;
  align-items: center;
}

#sign {
  margin: 0% 10% 20% 60%;
}
</style>


