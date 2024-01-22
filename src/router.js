import { createRouter, createWebHistory } from 'vue-router'
//管理者ページ
import Admin_create_page from './components/Admin/Admin_create_page.vue'
import Admin_edit_detail from './components/Admin/Admin_edit_detail.vue'
import Admin_edit_page from './components/Admin/Admin_edit_page.vue'
import Admin_login from './components/Admin/Admin_login.vue'
import Admin_page from './components/Admin/Admin_page.vue'
import Admin_signup from './components/Admin/Admin_signup.vue'


//ユーザーページ
import User_basic_page from './components/User/User_basic_page.vue'
import User_detail_page from './components/User/User_detail_page.vue'


//Tableのテンプレートページ
import Toilet_table from './components/Toilet_table.vue'


const routes = [
    { path: '/', component: Admin_edit_detail,}, //TopPageを表示
    { path: '/:pathMatch(.*)*', redirect: '/User_basic_page' }, //存在しないパスにアクセスした場合はUser_basic_pageを表示
    //管理者側
    { path: '/Admin_login', component:Admin_login,},
    { path: '/Admin_signup', component:Admin_signup,},
    { path: '/Admin_create_page', component:Admin_create_page,},
    { path: '/Admin_edit_page', component:Admin_edit_page,},
    { path: '/Admin_edit_detail', component:Admin_edit_detail,},
    { path: '/Admin_page', component:Admin_page,},
    //ユーザー側
    { path: '/User_detail_page', component: User_detail_page },
    { path: '/User_basic_page', component: User_basic_page },
    { path: '/User_detail_page:id', component: User_detail_page },
    { path: '/User_basic_page:id', component: User_basic_page },
  ]
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;
