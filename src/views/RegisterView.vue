<template>
  <div class="wrap">
    <p class="headText">Sign up</p>

    <form @submit="createUser">

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="first" id="first" placeholder="First name" v-model="form.first_name" required>
      </div>
      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input type="text" name="last" id="last" placeholder="Last name" v-model="form.last_name" required>
      </div>

      <div class="icon-inside">
        <i class="fa fa-user icon fa-lg"></i>
        <input :class="{error: isEmailCorrect,}" type="text" name="usernmae" id="usernmae" placeholder="Username" v-model="form.username" required @input="isEmailCorrect=''">
      </div>

      <div class="icon-inside">
        <i class="fa fa-at icon fa-lg"></i>
        <input :class="{error: isEmailCorrect,}" type="text" name="email" id="email" placeholder="E-mail" v-model="form.email" required @input="isEmailCorrect=''">
      </div>

      <div class="icon-inside">
        <i class="fa fa-phone icon fa-lg"></i>
        <input type="text" name="phone" v-mask="'+7(###)-###-##-##'" id="phone" placeholder="Phone number" v-model="form.phone" required>
      </div>

      <div class="icon-inside">
        <i class="fa fa-key fa-lg"></i>
        <input :class="{error: isPassCorrect,}" type="password" name="password" id="pass" placeholder="Password" v-model="form.pass" required @input="isPassCorrect=''">
      </div>

      <div class="icon-inside">
        <i class="fa fa-key icon fa-lg"></i>
        <input :class="{error: isPassCorrect,}" type="password" name="password2" id="pass2" placeholder="Confirm password" v-model="form.repeat_pass" required @input="isPassCorrect=''">
        <p class="incorrect">{{isPassCorrect}}</p>
        <p class="incorrect">{{isEmailCorrect}}</p>

      </div>

      <!-- <router-link to="/portfolio"><input type="button" value="SEND" class="bgButton"></router-link> -->
      <input type="submit" value="SEND" class="bgButton">
      <router-link to="/login"><input type="button" value="I already have an account" class="nobgButton"></router-link>

    </form>

  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'RegisterView',
  components: {
  },

  data(){
    return {
      form: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '+7',
        pass: '',
        repeat_pass: ''
      },
      isPassCorrect: '',
      isEmailCorrect: ''
    }
  },

  computed: {
  },

  methods: {
    async createUser(e){
      e.preventDefault();
      if(this.form.pass == this.form.repeat_pass){
        await axios.post('http://78.40.109.118:3000/api/user', this.form)
        .then(response => {
            console.log(response.data);
            this.$router.push(`/portfolio/?user_id=${response.data}`)
        })
          .catch(error => {
            if(error.response.status == 400){
              this.isEmailCorrect = 'Username or Email exist'
            }
        });
      }else{
        this.isPassCorrect = 'Passwords not equal';
      }
    },
  }
}
</script>

<style lang="scss" scoped>

  .wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 100%;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
  } 

  form{
    display: flex;
    flex-direction: column;
    height: 700px;
    justify-content: space-between;
    align-items: center;
  }

  input {
    width: 400px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    font-size: 20px;
    font-family: 'Poppins', 'Nunito', sans-serif;
  }

  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

  .error{
    border-color: #FF0000;
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
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border: 0;
  }

  .nobgButton{
    background-color: transparent;
    border: 0;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
    color: #5D5FEF;
  }

  .incorrect {
    color: #FF0000;
    font-size: 16px;
    font-family: 'Poppins', 'Nunito', sans-serif;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 200px;
  }

  input{
    width: 250px;
  }

  .nobgButton{
    font-size: 16px;
  }
}


</style>
