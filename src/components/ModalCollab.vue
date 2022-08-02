<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <p class="headText">Collaborate</p>

        <form action="#" method="post">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" placeholder="Title" v-model="data.title">

            <label for="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" v-model="data.descr"></textarea>

            <p class="lab">Add file</p>
            <label for="filePortfolio" class="fileType bgButton">Upload file</label>
            <input type="file" id="filePortfolio" name="portfile" multiple>

        </form>

      <button @click="offerCollab">Send</button>
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
            }
          }
        },


        methods:{
          async offerCollab(){
            // this.data.u_from = this.$store.getters.getUserId;
            // this.data.u_to = this.$route.query.id;
            // this.data.c_status = 'created';
            const formData = new FormData(document.querySelector('form'));
            formData.append('u_from', this.$store.getters.getUserId);
            formData.append('u_to', this.$route.query.id);
            formData.append('c_status', 'created');

            for (var pair of formData.entries()) {
              console.log(pair[0]+' '+pair[1])
            }

            await axios.post('http://78.40.109.118:3000/api/collabs', formData)
            .then(res => {
              console.log(res);
            })
            this.$emit('close-modal');

          }
        }
    }
</script>

<style lang="scss" scoped>
.lab{
        font-family: 'Poppins';
        font-size: 20px;
        color: #5D5FEF;
    }

    .fileType{
    padding: 5px 10px;
    border-radius: 10px;
        text-align: center;

  }

  input[type="file"]{
        display: none;
  }
  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins';
    font-size: 24px;
    font-weight: bold;
    border: 0;
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
      height: 550px;
      overflow-y: auto;
      width: 430px;
      margin-top: 5%;
      padding: 60px 0;
      border-radius: 20px;
    }


    button {
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins';
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
        font-family: 'Poppins';
        text-align: left;
    }

    input {
        height: 50px;
        border: 2px solid #DADADA;
        border-radius: 8px;
        color:#5D5FEF;
        font-size: 20px;
        font-family: 'Poppins';
    }

    textarea{
        border: 2px solid #DADADA;
        border-radius: 8px;
        color:#5D5FEF;
        font-size: 20px;
        font-family: 'Poppins';
    }
</style>