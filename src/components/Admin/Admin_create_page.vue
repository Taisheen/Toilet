<!-- 
  作成者：勇貴士
  変更者：
  画面概要：
-->
<script>
  export default {
    data() {
      return {
        buildings: [
          {
            buildingName:'',
            floors: []
          }
          
        ]
      };
    },
    methods: {
      addElement(index1) {
        if(this.buildings[index1].floors.length == 0 && index1 == this.buildings.length - 1) {
          this.buildings.push(
            {
              buildingName:'',
              floors: []
            }
          )
        }
        this.buildings[index1].floors.push(
          {
            stairsName: '',
            toiletNumber: '',
          }
        );
      },
      removeElement(index1) {
        if (this.buildings[index1].floors.length > 0) {
          this.buildings[index1].floors.pop();
        }
        while(this.buildings[this.buildings.length - 2].floors.length == 0){
          this.buildings.pop();
        }
      }
    },
  }
</script>

<template>
  <div v-for="(element1, index1) in buildings" :key="index1" class="a">
    <input v-model="element1.buildingName" type="text" class="building-name" name="building-name" placeholder="名称を入力してください 例）一号館">
    <div class="container">
      <button class="btn" @click="removeElement(index1)"><strong>―</strong></button>
      <button class="btn" @click="addElement(index1)"><strong>+</strong></button>
      <div class="toilet-container">
        <div v-for="(element2, index2) in element1.floors" :key="index2" class="rounded-container">
          <input v-model="element2.stairsName" type="text" :placeholder="(index2 + 1) + '階 '">
          <img src="../../assets/Toilet_icon_blue.png" alt="トイレアイコン">
          <input v-model="element2.toiletNumber" type="number" max="50" min="1" placeholder="個数">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    margin: 2%;
  }
  .toilet-container {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
  }
  .rounded-container {
    display: flex;
    flex-direction: column;
    width: 10%;
    /* flex-grow: 1; */
    min-width: 50px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid black;
    background-color: white;
    margin: 0.3rem 0.3rem;
  }
  .btn {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 20%; /* 角丸にすることで円形に見える */
    font-size: 1.3em;
    text-decoration: none; 
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease; /* ホバー時のトランジションを追加 */
    margin: 2.5% 0.6%;
  }
  .btn:hover {
    background-color: #f0f0f0;
  }
  .building-name {
    outline: none;
    height: 2em;
    width: 20em;
    border-radius: 10px;
    text-align: center;
    background-color: white;
    margin: 2.5% 0 0 2.5%;
  }
  input {
    text-align: center;
  }

  input:focus {
    outline: none;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    opacity: 1;
  }

  img {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 840px) {
    .rounded-container {
      min-width: 66px;
    }
  }
  
  @media screen and (max-width: 500px) {
    .rounded-container {
      min-width: 50px;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      display: none;
    }
  }
</style>