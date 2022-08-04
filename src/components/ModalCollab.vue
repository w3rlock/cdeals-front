<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
        <div  v-if="!dataSended">
        <form action="#" method="post">
            <p class="headText">Collaborate</p>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" placeholder="Title" v-model="data.title">

            <label for="description">Description</label>
            <textarea name="descr" id="description" cols="30" rows="10" placeholder="Description" v-model="data.descr"></textarea>

            <!-- <p class="lab">Add file</p> -->
            <label for="filePortfolio" class="fileType bgButton">Upload file</label>
            <input type="file" id="filePortfolio" name="portfile" multiple ref="fileInput" @change="fileChanged">
            <div>
              <div v-for="(f, id) in file" :key="'file'+id" style="display: flex; flex-direction: row;  align-items: center;">
                <p  class="linkHeads">{{f.name}}</p>
                <input type="button" value="x" class="deleteButton" @click="deleteFile(f.name)">
              </div>
            </div>
        </form>
            <button @click="offerCollab">Send</button>
        </div>
        <div class="loader" v-if="dataSended"></div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

    export default {
        name: 'Modal',

        data(){
          return{
            data:{
              title: '',
              descr: ''
            },
            file: [],
            dataSended: false,
          }
        },

        created(){
        },

        methods:{
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
          async offerCollab(){
            this.dataSended = true;
            // this.data.u_from = this.$store.getters.getUserId;
            // this.data.u_to = this.$route.query.id;
            // this.data.c_status = 'created';
            const formData = new FormData(document.querySelector('form'));
            formData.append('u_from', this.$store.getters.getUserId);
            formData.append('u_to', this.$route.query.id);
            formData.append('c_status', 'created');
            formData.delete('portfile');
            for (let i=0; i<this.file.length; i++) {
              formData.append('portfile', this.file[i])
            }
            for (var pair of formData.entries()) {
              console.log(pair[0]+' '+pair[1])
            }

            await axios.post('http://78.40.109.118:3000/api/collabs', formData)
            .then(res => {
              this.dataSended = false;
              this.data.title = '';
              this.data.descr = '';
              console.log(res);
            })
            this.$emit('close-modal');

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

.lab{
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 20px;
        color: #5D5FEF;
    }

    .fileType{
    padding: 5px 10px;
    border-radius: 10px;
        text-align: center;

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

  input[type="file"]{
        display: none;
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
    .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    }

    .modal {
      text-align: center;
      background-color: white;
      height: 50%;
      overflow-y: auto;
      width: 430px;
      margin-top: auto;
      margin-bottom: 50px;
      padding: 60px 0;
      border-radius: 20px;
    }


    button {
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border: 0;
    margin: 15px;
    border-radius: 10px;
    }

    form{
        display: flex;
        flex-direction: column;
        margin: 0 50px;
    }

    label{
        font-size: 24px;
        font-family: 'Poppins', 'Nunito', sans-serif;
        text-align: left;
    }

    input {
        height: 50px;
        border: 2px solid #DADADA;
        border-radius: 8px;
        color:#5D5FEF;
        font-size: 20px;
        font-family: 'Poppins', 'Nunito', sans-serif;
    }

    textarea{
        border: 2px solid #DADADA;
        border-radius: 8px;
        color:#5D5FEF;
        font-size: 20px;
        font-family: 'Poppins', 'Nunito', sans-serif;
    }
</style>