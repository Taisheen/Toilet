import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from "firebase/auth";
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
    { path: '/', component: Admin_login,}, //TopPageを表示
    { path: '/:pathMatch(.*)*', redirect: '/Admin_login' }, //存在しないパスにアクセスした場合はUser_basic_pageを表示
    //管理者側
    { path: '/Admin_login', component:Admin_login,},
    { path: '/Admin_signup', component:Admin_signup,},
    { path: '/Admin_create_page', component:Admin_create_page,beforeEnter: (to, from, next) => {Redirect(to, from, next)}},
    { path: '/Admin_edit_page', component:Admin_edit_page,beforeEnter: (to, from, next) => {Redirect(to, from, next)}},
    { path: '/Admin_edit_detail', component:Admin_edit_detail,beforeEnter: (to, from, next) => {Redirect(to, from, next)}},
    { path: '/Admin_page', component:Admin_page, beforeEnter: (to, from, next) => {Redirect(to, from, next)}},
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
  //ログイン後に表示するページでログインしていない場合はログインページにリダイレクトする関数
 const Redirect = (to, from, next) => {
    // Firebase Authenticationの現在のユーザーを取得
    const user = getAuth().currentUser;
    // ユーザーがログインしていればそのまま遷移
    if (user) {
      next();
    } else {
      // ユーザーがログインしていなければ/にリダイレクト
      next('/');
    }
  };

export default router;
