<template>
  <div class="wrap">
    <p class="headText" v-show="!this.$store.getters.getIsLogined">Log in</p>
    <p class="headText" v-show="this.$store.getters.getIsLogined">You are already logged in</p>
    <form @submit="login" v-show="!this.$store.getters.getIsLogined">

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="email" id="email" placeholder="E-mail">
      </div>

      <div class="icon-inside">
        <i class="fa fa-key icon fa-lg"></i>
        <input type="password" name="password" id="pass" placeholder="Password">
      </div>
      <p v-if="isLogin">Email or Password is incorrect</p>

      <input type="submit" value="SEND" class="bgButton">
      <router-link to="/register"><input type="button" value="Sign up" class="nobgButton"></router-link>

    </form>

  </div>
</template>

<script>

export default {
  name: 'LoginView',
  components: {
  },
  data(){
    return{
      isLogin: null,
    }
  },

  methods:{
    login(e){
      e.preventDefault();
      const formData = new FormData(document.querySelector('form'));
      const email = formData.get('email')
      const pass = formData.get('password')
      this.$store.dispatch('onLogin', {email: email, password: pass}).then(response => {
        if(response.response.status == 401){
          this.isLogin = true;
        }else if (response.response.status == 200){
          this.isLogin = false;
        }
      }).catch(error => {
        console.log(error);
      })
    }
  },

  computed:{
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
    height: 270px;
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
  input{
    width: 250px;
  }
}

</style>
