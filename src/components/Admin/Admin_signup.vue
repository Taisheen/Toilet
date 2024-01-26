<!-- 
  作成者：兼松剛
  変更者：
  画面概要：
-->

<script setup>
//import HelloWorld from './components/HelloWorld.vue'
// 確認する場合は、↓のimportのfrom部分を確認したいファイルに変更する。
//import TestPage from "./components/User/User_basic_page.vue";

// パスワードの奴
import { ref } from 'vue'
import {firebaseauth} from '../../firebase/usesignup'
import router from "../../router";

  const rules = {
    required: value => !!value || '必須.',
    min: v => v.length >= 6 || '6文字以上',
    emailMatch: () => (`メールアドレス、パスワードが一致しません`),
  }
  const show1 = ref(false)
  const show2 = ref(false)
  // const email =ref('')
  // const password1 = ref('')
  // const password2 = ref('')


</script>


<script >
export default {
    mounted(){
        //画面が表示されたら、入力フォームを空にする
        // firebaseauth.add_management_user.password1 = '';
        // firebaseauth.add_management_user.email = '';
    },
    data(){
        return{
        }
    },
    methods:{
        //ユーザ登録
        async signup(){
            await firebaseauth.signup();
            //管理者画面に遷移
            router.push('/Admin_create_page')
        },
    }

    

}
</script>

<template>
  <v-main v-if="currentUser == null">
    <div id="id">
      メールアドレス
      <v-text-field v-model="firebaseauth.email" prepend-inner-icon="mdi-account-circle" variant="solo"></v-text-field>
    </div>

    <div id="pass1">
      パスワード
      <v-text-field prepend-inner-icon="mdi-lock" variant="solo" v-model="firebaseauth.password1"
            :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            
            counter
            @click:append-inner="show1 = !show1">
      </v-text-field>
    </div>

    <div id="pass2">
      パスワード再入力
      <v-text-field prepend-inner-icon="mdi-lock" variant="solo" v-model="firebaseauth.password2"
            :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
         
            counter
            @click:append-inner="show2 = !show2">
      </v-text-field>
    </div>

    <div id="signup">
      <v-btn block id="button" height="50" color="#cdf9b8"  variant="flat" @click="signup">新規登録</v-btn>
    </div>
    <div id="login">
        <router-link to="/Admin_login">ログイン</router-link>
    </div>
  </v-main>
</template>


<style scoped>

#id {
  margin: 3% 30% 3% 30%;
  max-width: 600px;
}

#pass1 {
  margin: 0% 30% 3% 30%;
  max-width: 600px;
}

#pass2 {
  margin: 0% 30% 3% 30%;
  max-width: 600px;
}


#signup {
  margin: 0% 30% 0% 30%;
  max-width: 600px;
  align-items: center;
}

#login {
  margin: 0% 10% 20% 60%;
}

</style>
