<template>
  <div class="wrap">
    <p class="headText">Edit profile</p>

    <form @submit="editProfile">

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="first_name" id="first" placeholder="First name" v-model="data.first_name">
      </div>
      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="last_name" id="last" placeholder="Last name" v-model="data.last_name">
      </div>

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="username" id="usernmae" placeholder="Username" v-model="data.username">
      </div>

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="email" id="email" placeholder="E-mail" v-model="data.email">
      </div>

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="number" name="phone" id="phone" placeholder="Phone number" v-model="data.phone">
      </div>


      <input type="submit" value="EDIT" class="bgButton">

    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditProfileView',
  components: {
  },

  data(){
    return{
      data:{
        type: Object
      }
    }
  },

  methods:{
    async editProfile(e){
      e.preventDefault();
      await axios.put(`http://78.40.109.118:3000/api/user`, this.data)
      .then(res => {
        this.$router.push(`/profile/?id=${this.data.id}`)
      })
    }
  },

  created(){
    axios.get(`http://78.40.109.118:3000/api/user/${this.$store.getters.getUserId}`)
    .then(res => {
      this.data = res.data
    })
  }
}
</script>

<style lang="scss" scoped>

  .wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  } 

  form{
    display: flex;
    flex-direction: column;
    height: 400px;
    justify-content: space-between;
    align-items: center;
  }

  input {
    width: 400px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;

    font-size: 20px;
    font-family: 'Poppins';
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


  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins';
    font-size: 24px;
    font-weight: bold;
    border: 0;
  }

  .nobgButton{
    background-color: transparent;
    border: 0;
    font-family: 'Poppins';
    font-size: 20px;
    color: #5D5FEF;
  }

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 100px;
  }
  input{ 
    width: 250px;
  }
}

</style>
