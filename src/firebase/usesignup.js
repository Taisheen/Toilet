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
      currentUser:"",

       //ログイン認証用
      login_auth:null,

      //ログイン情報
      login_user:null,

      //ロード中かどうか
      loading: false,

      //初期のログイン処理が完了したかどうか
      first_login: false,

      //追加する管理者ユーザーの情報
      // add_management_user: {
        
      // },

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
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password1)
          .then((userCredential) => {
            // 成功時処理
            const user = userCredential.user;
            console.log(user);
            alert("ログイン成功")
          })
          .catch((error) => {
            // 失敗時処理
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(this.errormoji(errorCode))
            alert(errorCode)
           
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
        
        createUserWithEmailAndPassword(auth, this.email, this.password1)
          .then((userCredential) => {
            // 成功時処理
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            // 失敗時処理
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(this.errormoji(errorCode))
          });
          return;
      },

      async mounted() {
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
      
    })
