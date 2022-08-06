<template>
  <div class="wrap">

    <form v-if="!dataSended">
    <p class="headText">Edit portfolio</p>
        <img :src="$store.getters.getAvatar" alt="" height="160" width="160" id="blah">

        <label for="fileUpload" class="fileType bgButton">Upload Avatar</label>
        <input type="file" id="fileUpload"  name="avatar" @change="readURL">
           
        <select name="role" id="role" v-model="selectedRole" @change="getCategories">
            <option v-for="item in roles" :key="item.id" :value="item.id">{{item.role_name}}</option>
        </select>

        <select name="category" id="category" v-model="selectedCategory">
            <option v-for="item in category" :key="item.id" :value="item.id">{{item.category}}</option>
        </select>

        <textarea name="about" id="about" cols="30" rows="10" placeholder="About yourself" v-model="data.about"></textarea>
        <!-- <p class="lab">Portfolio</p> -->


        <div style="display: flex; flex-direction: column">
          <div style="display: flex; flex-direction: row"  v-for="item in links" :key="item.id">
            <a class="links" :href="item.l_name">{{item.link_name}}</a>
            <input type="button" value="x" class="deleteButton" @click="deleteLink(item.id, 'old')">
          </div>
        </div>

        <input type="button" value="Add link" class="bgButton" @click="addLink">

        <div v-if="newLinks.length>0">
            <div v-for="(l, index) in newLinks" :key="l.id" style="display: flex; flex-direction: column">
            <div style="display: flex; flex-direction: row;  align-items: center;">
              <p class="linkHeads">{{index+1}} link</p>
              <input type="button" value="x" class="deleteButton" @click="deleteLink(l.id, 'new')">
            </div>
            <input type="text" :name="'name'+l.id" v-model="l.name" placeholder="Name of link">
            <input  type="text" :name="l.id" v-model="l.value" placeholder="Link">
          </div>
        </div>
        


        <!-- <p class="lab">Add file</p> -->
        <label for="filePortfolio" class="fileType bgButton">Upload file</label>


        <div v-for="f in file" :key="'file'+f.id" style="display: flex; flex-direction: row;  align-items: center;">
            <p  class="linkHeads">{{f.f_name}}</p>
            <input type="button" value="x" class="deleteButton" @click="deleteFile(f.f_name)">
        </div>
        <div v-for="(f, index) in newFile" :key="'file'+index" style="display: flex; flex-direction: row;  align-items: center;">
            <p  class="linkHeads">{{f.name}}</p>
            <input type="button" value="x" class="deleteButton" @click="deleteFile(f.name)">
        </div>

        <input type="file" id="filePortfolio" name="portfile" multiple ref="fileInput" @change="fileChanged">
        
        



      <input type="submit" value="SAVE" class="bgButton" @click="updatePortfolio">

    </form>
    <div class="loader" v-if="dataSended"></div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'EditPortfolioView',
  components: {

  },
  data(){
    return{
      data:{
        type: Object
      },
      roles: null,
      category: null,
      selectedRole: null,
      selectedCategory: null,
      numOfLinks: 0,
      links: {
        type: Object
      },
      linksForDelete:[],
      newLinks: [],
      file: [],
      filesForDelete: [],
      newFile: [],
      dataSended: false,
    }
  },

  created(){
    this.dataSended = false;
    axios.get(`http://78.40.109.118:3000/api/portfolio?id=${this.$store.getters.getUserId}`)
    .then(res => {
      this.data = res.data[0];
      this.selectedRole = this.data.role;
      this.selectedCategory = this.data.category;

      axios.get(`http://78.40.109.118:3000/api/roles/?id=${this.selectedRole}`)
          .then(res => {
            this.category = res.data
          })

      axios.get(`http://78.40.109.118:3000/api/files/?id=${this.$store.getters.getUserId}`)
      .then(res => {
          this.file = res.data;
          // console.log(this.file)
      })

    })

    axios.get('http://78.40.109.118:3000/api/category').then(res => {
        this.roles = res.data;
    })

    axios.get(`http://78.40.109.118:3000/api/links/${this.$store.getters.getUserId}`).then(res => {
        this.links = res.data;
        const ids = this.links.map(object => {
          return object.id;
        });
        this.numOfLinks = Math.max(...ids)+1;
        // this.newLinks.push({id: this.numOfLinks, l_name: ""});
    })
console.log(this.newLinks.length)
  },

  methods: {

          deleteLink(id, type){
            if(type=='old'){
              for(let i=0; i<this.links.length; i++){
                if(this.links[i].id == id){
                    this.linksForDelete.push(this.links[i].id)
                    this.links.splice(i, 1);
                    console.log(this.linksForDelete)
                }
              }
            }else if(type=='new'){
              for(let i=0; i<this.newLinks.length; i++){
                if(this.newLinks[i].id == id){
                    this.linksForDelete.push(this.newLinks[i].id)
                    this.newLinks.splice(i, 1);
                }
              }
            }
            
          },
        deleteFile(name){
          for(let i=0; i<this.file.length; i++){
            if(this.file[i].f_name == name){
                this.filesForDelete.push(this.file[i].id)
                this.file.splice(i, 1);
            }
          }
          for(let i=0; i<this.newFile.length; i++){
            if(this.newFile[i].name == name){
                this.newFile.splice(i, 1);
            }
          }
          this.$refs.fileInput.type = "text"
          this.$refs.fileInput.type = "file"
          console.log(this.filesForDelete)
        },
        fileChanged(event){
            for (let i = 0; i < event.target.files.length; i++) {
              const files = event.target.files[i];
              console.log(files.name)
              this.newFile.push(files);
            }
        },

        addLink(){
          this.newLinks.push({value: '', id: this.numOfLinks, name: ''});
          this.numOfLinks++;
        },

        async updatePortfolio(e){
          e.preventDefault();
          this.dataSended = true;
          const formData = new FormData(document.querySelector('form'));
          formData.append('user_id', this.$store.getters.getUserId);
          formData.append('links', this.newLinks.map(item => [[item.name], [item.value]]));
          console.log(this.newLinks.map(item => [[item.name], [item.value]]));
          formData.delete('portfile');
          for (let i=0; i<this.newFile.length; i++) {
            formData.append('portfile', this.newFile[i])
          }
          // for (var pair of formData.entries()) {
          //   if(pair[0] == "avatar" && Object.keys(pair[1]).length == 0){
          //     console.log("not avatar")
          //   }
          // }
          await axios.put(`http://78.40.109.118:3000/api/portfolio/`, formData)
          .then(res => {
            if(res.data != 'withoutavatar'){
              this.$store.dispatch('setUserAvatar', {img: res.data})
            }
          })
          for(let i=0; i<this.filesForDelete.length; i++){
            await axios.delete(`http://78.40.109.118:3000/api/deletefile/${this.filesForDelete[i]}`)
          }
          for(let i=0; i<this.linksForDelete.length; i++){
            await axios.delete(`http://78.40.109.118:3000/api/deletelink/${this.linksForDelete[i]}`)
          }
          this.$router.push(`/profile/?id=${this.$store.getters.getUserId}`)
        },
        
         readURL(event) {
            console.log(event.target.files[0].name);
        },

        async getCategories(e){
          e.preventDefault();
          console.log(this.selectedRole);
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

    .linkHeads{
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 16px;
    color: #5D5FEF;
    margin: 10px 0;
    padding: 0;
    align-items: center;
    justify-content: center;
  }

  .wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    margin: 100px 0;

  } 

  form{
    display: flex;
    flex-direction: column;
    min-height: 1500px;
    justify-content: space-around;
    align-items: center;
  }

  input {
    width: 400px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    margin: 5px;
    font-size: 20px;
    font-family: 'Poppins', 'Nunito', sans-serif;
  }

  .icon-inside {
    position: relative;
    margin: 20px;
  }

  .fileType{
    padding: 5px 10px;
    border-radius: 10px;
  }

  input[type="file"]{
        display: none;
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


  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border: 0;
    margin: 10px 0;
  }

  .nobgButton{
    background-color: transparent;
    border: 0;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
    color: #5D5FEF;
    margin: 10px 0;
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
    .links{
      font-family: 'Poppins', 'Nunito', sans-serif;
      font-size: 16px;
      color: #5D5FEF;
      margin: 10px 0;
      padding: 0;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    @media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 200px;
  }
  input{
    width: 250px;
  }
}

</style>
