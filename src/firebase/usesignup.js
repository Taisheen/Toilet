/*
作成者：兼松剛
*/

import {
    getAuth,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import { reactive } from "vue";

  export const firebaseauth = reactive({

      // ログインしているユーザーデータ
      currentUser: null,

       //ログイン認証用
      login_auth:null,

      //ログイン情報
      login_user:null,

      //ロード中かどうか
      is_loading: false,

      //初期のログイン処理が完了したかどうか
      first_login: false,

      //追加する管理者ユーザーの情報
      // add_management_user: {
        
      // },

      login_log:false,
      email: '',
      password1: '',
      password2: '',

      errormoji(errorCode){
        switch (errorCode) {
          case 'auth/cancelled-popup-request':
          case 'auth/popup-closed-by-user':
             return null;
          case 'auth/email-already-in-use':
              return 'このメールアドレスは使用されています';    
          case 'auth/invalid-email':
            return 'メールアドレスの形式が正しくありません';
          case 'auth/user-disabled':
            return 'サービスの利用が停止されています';
          case 'auth/user-not-found':
            return 'メールアドレスまたはパスワードが違います';
          case 'auth/user-mismatch':
              return 'メールアドレスまたはパスワードが違います';
          case 'auth/weak-password':
            return 'パスワードは6文字以上にしてください';
          case 'auth/wrong-password':
            return 'メールアドレスまたはパスワードが違います';
          case 'auth/popup-blocked':
            return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
          case 'auth/operation-not-supported-in-this-environment':
          case 'auth/auth-domain-config-required':
          case 'auth/operation-not-allowed':
          case 'auth/unauthorized-domain':
            return '現在この認証方法はご利用頂けません';
          case 'auth/requires-recent-login':
            return '認証の有効期限が切れています';
          default:
              return 'エラーが発生しました。しばらく時間をおいてお試しください';
        }
      },

      // サインイン処理
      async login() {
        // メールアドレスとパスワードが入力されているかを確認
        if (this.email === "" || this.password1 == "") return;
        this.is_loading = true;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password1)
          .then((userCredential) => {
            // 成功時処理
            const user = userCredential.user;
            this.currentUser=user
            console.log(user);
            alert("ログイン成功")
            this.login_log=true
            this.is_loading = false;
          })
          .catch((error) => {
            // 失敗時処理
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(this.errormoji(errorCode))
            alert(errorCode)
            this.is_loading = false;
          });
      },

      // サインアップ処理
      async signup() {
        const auth = getAuth();

        //パスワードとパスワード確認が一致するか確認
        if (this.password1 !== this.password2) {
          alert("パスワードが一致しません。");
          return;
        }

        this.is_loading = true;
        createUserWithEmailAndPassword(auth, this.email, this.password1)
          .then((userCredential) => {
            // 成功時処理
            const user = userCredential.user;
            console.log(user);
            alert("登録成功")
            this.is_loading = false;
          })
          .catch((error) => {
            // 失敗時処理
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            this.is_loading = false;
            alert(this.errormoji(errorCode))
          });
          return;
      },

      async mounted() {
        this.is_loading = true;
        const auth = getAuth();
        // ログインしているユーザーを取得する
        onAuthStateChanged(auth, (user) => {
          if (user != null) {
            this.currentUser = user;
          } else {
            this.currentUser = null;
          }
        });
      },

      //ログアウト処理
      async logout() {
        //ログアウト確認
        if (confirm("ログアウトしますか？")) {
          this.is_loading = true;
          //ログアウト処理
          signOut(getAuth()).then(() => {
            this.currentUser = null;
            this.is_loading = false;
            //ログアウト処理
            alert("ログアウトしました。");
            //routerの履歴を削除
            router.go(0);
            return;
          })
        }
      },
      
    })
