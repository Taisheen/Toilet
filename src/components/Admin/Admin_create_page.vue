<!-- 
  作成者：勇貴士
  変更者：
  画面概要：
-->
<script>
  export default {
    data() {
      return {
        buildings: []
      };
    },
    methods: {
      addElement() {
        this.buildings.push({
          stairs: this.buildings.length + 1
        });
      },
      removeElement() {
        if(this.buildings.length > 0) { 
          this.buildings.pop();
        }
      }
    },
  };
</script>

<template>
  <div class="a">
    <input type="text" class="building-name" name="building-name" placeholder="名称を入力してください    例）一号館">
    <div class="container">
      <button class="btn" @click="removeElement"><strong>―</strong></button>
      <button class="btn" @click="addElement"><strong>+</strong></button>
      <div class="toilet-container">
        <div class="rounded-container">
          <input class="toilet-stairs-name" type="text" placeholder="1階">
          <img src="../../assets/Toilet_icon_blue.png" alt="トイレ">
          <input type="text" placeholder="個数">
        </div>
        <div v-for="(element, index) in buildings" :key="index" class="rounded-container">
          <input class="toilet-stairs-name" type="text" :placeholder="(index + 2) + '階 '">
          <img src="../../assets/Toilet_icon_blue.png" alt="トイレ">
          <input type="text" placeholder="個数">
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .a {
    border: 1px solid black;
  }
  .container {
    border: 1px solid black;
    display: flex;
    margin: 2%;
  }
  .toilet-container {
    border: 1px solid black;
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
  }
</style>