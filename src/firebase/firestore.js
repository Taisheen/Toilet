import { ref, reactive } from "vue";
import {getFirestore , doc, getDoc } from "firebase/firestore";

export const FireStore = reactive({

    //firebaseから取得したデータを格納する変数
    Toilet_table_items_db: [],

    //firebaseから取得するID
    Toilet_ID: "mJWV67TP4brb6Iw0t3OP", //仮用のID

    //firebaseからデータ(Toiletコレクション)を取得する関数
    async getData() {
        const db = getFirestore()
        //firebaseからデータを取得
        const docRef = doc(db, "Toilet", this.Toilet_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            //firebaseから取得したデータを格納
            this.Toilet_table_items_db = docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    },
})