<!-- 
  作成者：柳田 大心
  変更者：
  画面概要：管理者がトイレの状況を確認できる
-->

<script setup>
import router from "../../router";
</script>

<script>
import { FireStore }  from "../../firebase/firestore";
export default {
  mounted(){
    FireStore.getData()
  },
  data() {
    return {
      FireStore
    };
  }, 
  methods:{
    GetIndex:function(index1,index2){
      FireStore.Index1 = index1,
      FireStore.Index2 = index2
      router.push('/Admin_edit_detail')
    }
  }
};
</script>
<template>
  <v-main>
    <div id="QR_domain_container">
      <div id="QR_domain">
        QRコード
      </div>
    </div>
    <div id="building_container" v-for="(buildings, index1) in FireStore.Toilet_table_items_db.buildings" :key="buildings">
      <div id="building_name">
       {{buildings.name}}
      </div>
      <div id="building_floors" v-for="(floors , index2) in buildings.floors" :key="floors">
        {{floors.name}}
        <button id="Toilet_button" @click= "GetIndex(index1,index2)">
          <img src="../../assets/Toilet_icon_blue.png">
        </button>
      </div>
    </div>
  </v-main>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap");
/* cssリセット */
@media screen and (max-width: 500px) {
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    margin: auto;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }
  #building_floors{
    width: 120px;
    height: 150px;
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  #Toilet_button img{
    height: 100px;
    width: 115px;
    display: block;
    border-top: 2px solid black ;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  #Toilet_button img:hover{
    transform:translateY(2.5px);
  }
  #QR_domain_container{
    border: 2px solid black;
    height: 150px;
    width: 250px;
    margin:auto;
    margin-bottom: 0px;
    background-color:white;
    border-radius: 20px;
  }
  #QR_domain{
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;

  }
}

@media screen and (max-width: 700px) and (min-width: 500px) {
  /* 500px以上700px以下に適用されるCSS（スマホ用） */
  #building_container {
    margin: auto;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }
  
  #building_floors{
    width: 120px;
    height: 150px;
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  
  #Toilet_button img{
    height: 100px;
    width: 115px;
    padding: auto;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    
  }
  #Toilet_button img:hover{
    transform:translateY(2.5px);
  }
  #QR_domain_container{
    border: 2px solid black;
    height: 150px;
    width: 250px;
    margin:auto;
    margin-bottom: 0px;
    background-color:white;
    border-radius: 20px;
  }
  #QR_domain{
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;

  }
  
}
@media screen and (min-width: 701px) {
  /* 701px以上に適用されるCSS（PC用） */
  #building_container {
    margin: auto;
    text-align: center;
  }

  #building_name {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    font-family: "Noto Sans JP", sans-serif;
  }

  #Toilet_button img{
    width: 170px;
    height: 150px;
    display: block;
    border-top: 2px solid black;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius:7px;
    transition: .3s;
  }

  #Toilet_button img:hover{
    transform:translateY(2.5px);
  }
  #building_floors{
    width: 175px;
    height: 200px;
    text-align: center;
    font-size: 30px;
    font-family: "Noto Sans JP", sans-serif;
    display: inline-block;
    border: 2px solid black;
    background-color: white;
    margin: 2px;
    border-radius: 10px;
  }
  #QR_domain_container{
    border: 2px solid black;
    height: 150px;
    width: 250px;
    margin:auto;
    margin-bottom: 0px;
    background-color:white;
    border-radius: 20px;
  }
  #QR_domain{
    text-align: center;
    font-family: "Noto Sans JP", sans-serif;

  }
}
</style>