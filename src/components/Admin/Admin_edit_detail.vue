<!-- 
  作成者：兼松剛
  変更者：兼松剛
  画面概要：管理者編集詳細画面
-->

<script setup>
import { FireStore} from "../../firebase/firestore"

</script>

<script>

export default {
  data() {
    return {
      selectedImage: null,
      elements: [],
      selectindex:'',
    };
  },
  methods: {
    //トイレの個数増減
    addElement() {
        this.elements.push({});
      },
      removeElement() {
        if(this.elements.length > 0) { 
          this.elements.pop();
        }
      },


    //ファイル画像表示
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      
      // 画像が選択されていることを確認
      if (file && file.type.startsWith('image/')) {
        // FileReaderを使用して画像を読み込む
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }

      // 選択後に input type="file" 要素をリセット
      this.$refs.fileInput.value = null;
    },
    async uploadImage() {
      if (!this.selectedImage) {
        console.error('No file selected.');
        return;
      }

    FireStore.update(this.selectedImage);  
      // const storage = getStorage();
      // const storageReference = storageRef(storage, 'Admin/' + Date.now());
      
      // try {
      //   // ImagePickerで選択された画像がファイルURIの場合、putメソッドを使用してアップロード
      //   const response = await fetch(this.selectedImage);
      //   const blob = await response.blob();
      //   await uploadBytes(storageReference, blob);
      //   console.log('File uploaded successfully.');
      // } catch (error) {
      //   console.error('Error uploading file:', error.message);
      // }
    },
  },
};


//画像が押されたときの処理

function Click() {
  // クリック時の動作を指定できます
  location.href = "/Admin_login";
}


</script>

<template>
  <v-main>
   <v-text class="buildingtext">一号館一階</v-text>
   <v-text class="building-name" name="building-name" placeholder=""/>
      <div class="container">
        <button class="btn" @click="removeElement"><strong>―</strong></button>
        <button class="btn" @click="addElement"><strong>+</strong></button>
        <div class="toilet-container">
          <div class="rounded-container">
            <input class="toilet-stairs-name" type="text" placeholder="1室">
            <img src="../../assets/Toilet_icon_blue.png" class="img" alt="トイレ">
          </div>
          <div v-for="(element, index) in elements" :key="index" class="rounded-container">
            <input class="toilet-stairs-name" type="text" :placeholder="(index + 2) + '室 '">
            <img src="../../assets/Toilet_icon_blue.png" class="img" alt="トイレ" @click="selectedImage">
          </div>
        </div>
      </div>  

    <v-container id="image">
      <v-row>
        <v-col>
          <div id="bt">
            <div class="imgbt-container">
              <img src="../../assets/Toilet_icon_blue1.png" class="gazou" alt="空室">
            </div>
            <v-text style="font-weight :bold">空室</v-text>
          </div>
        </v-col>
        <v-col>
          <div id="bt">
            <div class="imgbt-container">
              <img src="../../assets/Toilet_icon_pink1.png" class="gazou" alt="満室">
            </div>
            <v-text style="font-weight :bold">満室</v-text>
          </div>
        </v-col>
        <v-col>
          <div id="bt">
            <div class="imgbt-container">
              <img src="../../assets/Toilet_icon_yellow1.png" class="gazou" alt="故障中">
            </div>
            <v-text style="font-weight :bold">故障中</v-text>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="upload">
      <v-btn @click="openFileInput" color="#cdf9b8" >フロアマップ図アップロード</v-btn>
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="handleFileChange"
        accept="image/*"
      />
    </v-container>
    <v-img id="image-zu" v-if="selectedImage" :src="selectedImage" max-width="500" max-height="500" />

    <div id="memo">
    <v-textarea label="メモ" variant="solo"></v-textarea>
    </div>

    <v-container>
      <v-row>
          <v-col>
            <div id="back">
            <v-btn color="#cdf9b8" onclick="location.href='./Admin/Admin_edit_page'">戻る</v-btn>
            </div>
          </v-col>
          <v-col>
            <div id="update">
            <v-btn @click="uploadImage" color="#cdf9b8">更新</v-btn>
            </div>
          </v-col>
      </v-row>
    </v-container>


  </v-main>
</template>


<style scoped>
.buildingtext{
  margin-left: 10%;
  font-weight: bold;
}
 .container {
    /* border: 1px solid black; */
    display: flex;
    margin: 2%;
  }

  .toilet-container{
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
    border: 1px solid black transparent;
    margin: 0.3rem 0.3rem;
    &:hover {
    border: 2px solid black; /* 外枠の太さや色を設定 */
    }
    background-color: white;
    
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
  .toilet-stairs-name {
    text-align: center;
  }

  .toilet-stairs-name:focus {
    outline: none;
  }

  .img {
    border-top: 1px solid black;
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 840px) {
    .rounded-container {
      min-width: 66px;
    }
    .imgbt-container {
      min-width: 50px;
    }
  }

  @media screen and (max-width: 500px) {
    .rounded-container {
      min-width: 50px;
    }
    .imgbt-container {
      min-width: 40px;
    }
  }
.gazou{
  width: 100%;
  height: auto;
}
.imgbt-container{
  display: flex;
    flex-direction: column;
    width: 10%;
    /* flex-grow: 1; */
    min-width: 100px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid black transparent;
    &:hover {
    border: 2px solid black; /* 外枠の太さや色を設定 */
  }
    background-color: white;
    margin: 0.3rem 0.3rem;
    
}

#bt{
  display:flex;
  flex-flow: column;
  margin: 5% 10% 0% 10%;
  align-items: center;
}

#upload {
  margin: 5% 30% 0% 20%;
  max-width: 400px;
  align-items: center;
}

#image-zu{
  max-width: 400px;
  margin: 0% 40% 0% 40%;
  align-items: center;
}

#memo {
  margin: 5% 20% 0% 20%;
  max-width: 2000px;
  align-items: center;
}

#back{
  margin: 5% 30% 10% 40%;
  align-items: center;
}

#update{
  margin: 5% 60% 10% 40%;
  align-items: center;
}

</style>