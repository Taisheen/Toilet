<!-- 
  作成者：兼松剛
  変更者：
  画面概要：
-->

<script setup>
//import HelloWorld from './components/HelloWorld.vue'
// 確認する場合は、↓のimportのfrom部分を確認したいファイルに変更する。
//import TestPage from "./components/User/User_basic_page.vue";

//パスワードの奴
import { ref } from 'vue'

  const rules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    emailMatch: () => (`The email and password you entered don't match`),
  }

  const show1 = ref(false)
  const password = ref('')

</script>


<template>
  <v-main>

    <div id="id">
      ユーザ名
      <v-text-field prepend-inner-icon="mdi-account-circle" variant="solo"></v-text-field>
    </div>

    <div id="pass">
      パスワード
      <v-text-field height="50px" prepend-inner-icon="mdi-lock" variant="solo" v-model="password"
            :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append-inner="show1 = !show1">
      </v-text-field>
    </div>

    <div id="login">
      <v-btn block id="button" height="50" color="#cdf9b8"  variant="flat">ログイン</v-btn>

    </div>

    <div id="sign">
      <v-btn variant="text">
        <a href="">
          新規登録
        </a>
      </v-btn>
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


