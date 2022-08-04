<template>
  <div class="wrap">
    <p class="headText">Portfolio</p>

    <form @submit="createPortfolio" v-if="!dataSended">

        <img alt="" height="160" width="160" id="blah" :src="url">

        <label for="fileUpload" class="fileType bgButton">Upload Avatar</label>
        <input type="file" id="fileUpload"  name="avatar" @change="readURL">

           <p class="lab">Select role</p>
        <select name="role" id="role" v-model="selectedRole" @change="getCategories">
            <option v-for="item in roles" :key="item.id" :value="item.id">{{item.role_name}}</option>
        </select>

        <select name="category" id="category" v-model="selectedCategory">
            <option v-for="item in category" :key="item.id" :value="item.id">{{item.category}}</option>
        </select>

        <textarea name="about" id="about" cols="30" rows="10" placeholder="About yourself"></textarea>
        <!-- <p class="lab">Portfolio</p> -->


        <input type="button" value="Add link" class="bgButton" @click="addLink">
        <div v-for="(item, index) in links" :key="item.id" style="display: flex; flex-direction: column;">
          <div style="display: flex; flex-direction: row;  align-items: center;">
            <p class="linkHeads">{{index+1}} link</p>
            <input type="button" value="x" class="deleteButton" v-if="links.length!=1" @click="deleteLink(item.id)">
          </div>
          <input type="text" :name="'name'+item.id" v-model="item.name" placeholder="Name of link">
          <input type="text" :name="item.id" v-model="item.value" placeholder="Link">
        </div>


        <!-- <p class="lab">Add file</p> -->
        <label for="filePortfolio" class="fileType bgButton">Upload file</label>
        <input type="file" id="filePortfolio" name="portfile" multiple ref="fileInput" @change="fileChanged">
        <div>
          <div v-for="(f, id) in file" :key="'file'+id" style="display: flex; flex-direction: row;  align-items: center;">
            <p  class="linkHeads">{{f.name}}</p>
            <input type="button" value="x" class="deleteButton" @click="deleteFile(f.name)">
          </div>
        </div>
        
      <input type="submit" value="SEND" class="bgButton">

    </form>
    <div class="loader" v-if="dataSended"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PortfolioView',
  components: {

  },
  data(){
    return{
      selectedFile: null,
      url: '../assets/img/avatar.png',
      data: {
        type: Object
      },
      file: [],
      roles: null,
      category: null,
      selectedRole: '',
      selectedCategory: null,
      numOfLinks: 1,
      links: [{
        value: '',
        id: 0
      }],
      dataSended: false,
    }
  },

  created() {
    this.dataSended = false;
    axios.get('http://78.40.109.118:3000/api/category').then(res => {
        this.roles = res.data;
    })
  },

  methods: {
         readURL(event) {
            this.selectedFile = event.target.files[0];
            this.url = URL.createObjectURL(this.selectedFile);
        },

        addLink(){
          this.links.push({value: '', id: this.numOfLinks, name: ''});
          this.numOfLinks++;
        },

        deleteLink(id){
          if(this.links.length != 1){
            for(let i=0; i<this.links.length; i++){
              if(this.links[i].id == id){
                  this.links.splice(i, 1);
                  console.log(this.links)
              }
            }
          }
        },

        fileChanged(event){
            for (let i = 0; i < event.target.files.length; i++) {
              const files = event.target.files[i];
              console.log(files.name)
              this.file.push(files);
            }
        },

        deleteFile(name){
          for(let i=0; i<this.file.length; i++){
            if(this.file[i].name == name){
                this.file.splice(i, 1);
            }
          }
          this.$refs.fileInput.type = "text"
          this.$refs.fileInput.type = "file"
        },

        console(link){
          console.log(link)
        }, 
        async createPortfolio(e){
          e.preventDefault();
          this.dataSended = true;
          const formData = new FormData(document.querySelector('form'));
          formData.append('user_id', this.$route.query.user_id);
          formData.append('links', this.links.map(item => [item.name, item.value]));
          console.log(this.links.map(item => [[item.name], [item.value]]))
          formData.delete('portfile');
          for (let i=0; i<this.file.length; i++) {
            formData.append('portfile', this.file[i])
          }
          for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
          }
          await axios.post('http://78.40.109.118:3000/api/portfolio', formData)
          .then(response => {
              console.log(response);
              this.$router.push(`/login`)
          }).catch(error => {
              console.log(error);
          });
        },

        async getCategories(e){
          e.preventDefault();
          await axios.get(`http://78.40.109.118:3000/api/roles/?id=${this.selectedRole}`)
          .then(res => {
            this.category = res.data
          })
        }
  }
}
</script>

<style lang="scss" scoped>

  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .deleteButton{
    margin: 0 5px;
    color: red;
    font-size: 20px;
    width: 30px;
    height: 30px;
    padding: 0;
    background-color: transparent;
    border: none;
  }

  .wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 100px;

  } 

  .linkHeads{
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 16px;
    color: #5D5FEF;
    margin: 10px 0;
    padding: 0;
    align-items: center;
    justify-content: center;
  }

  form{
    display: flex;
    flex-direction: column;
    min-height: 1200px;
    justify-content: space-between;
    align-items: center;
  }

    input[type="file"] {
        display: none;
    }


  input {
    width: 400px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    font-size: 20px;
    font-family: 'Poppins', 'Nunito', sans-serif;
  }

  .icon-inside {
    position: relative;
  }


  .icon-inside i {
    position:absolute;
    left:0;
    top:10px;
    padding:10px 15px;
    color:#5D5FEF;
  }

  .icon-inside input {
    color: #5D5FEF;
    padding-left: 40px;
  }

  .fileType{
    padding: 5px 10px;
    border-radius: 10px;
  }


  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border: 0;
    margin: 20px 0;
  }

  .nobgButton{
    background-color: transparent;
    border: 0;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
    color: #5D5FEF;
  }

  select {
    background-color: transparent;
    width: 250px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    color: #5D5FEF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
    margin: 10px 0;
  }

    textarea{
        background-color: transparent;
        border: 2px solid #DADADA;
        border-radius: 8px;
        color: #5D5FEF;
        font-size: 20px;
        font-family: 'Poppins', 'Nunito', sans-serif;
    }

    .lab{
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 20px;
        color: #5D5FEF;

    }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    input{
      width: 250px;
    }

    .wrap{
      margin-top: 200px;
    }
  }

</style>
