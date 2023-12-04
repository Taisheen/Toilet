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

  const rules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    emailMatch: () => (`The email and password you entered don't match`),
  }
  const show1 = ref(false)
  const show2 = ref(false)
  const email =ref('')
  const password1 = ref('')
  const password2 = ref('')

</script>

<template>
  <v-main>

    <div id="id">
      メールアドレス
      <v-text-field v-model="email" prepend-inner-icon="mdi-account-circle" variant="solo"></v-text-field>
    </div>

    <div id="pass1">
      パスワード
      <v-text-field prepend-inner-icon="mdi-lock" variant="solo" v-model="password1"
            :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append-inner="show1 = !show1">
      </v-text-field>
    </div>

    <div id="pass2">
      パスワード再入力
      <v-text-field prepend-inner-icon="mdi-lock" variant="solo" v-model="password2"
            :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append-inner="show2 = !show2">
      </v-text-field>
    </div>

    <div id="signup">
      <v-btn block id="button" height="50" color="#cdf9b8"  variant="flat">新規登録</v-btn>

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
  margin: 0% 30% 3% 30%;
  max-width: 600px;
  align-items: center;
}

</style>
