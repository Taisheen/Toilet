import router from './router'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//カネマツ12/1firebase
import "./firebase/firebase";


// Vuetify のインポートを追加 **********/
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 以下を追加 **********/
const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(vuetify).use(router).mount('#app')

//カネマツfirebase


