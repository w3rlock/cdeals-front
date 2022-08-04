<template>
  <div id="app">
    <header>
      <router-link to="/"><img src="./assets/logo.png" alt=""></router-link>
      <nav>
        <router-link to="/mycollabs" v-if="$store.getters.getIsLogined">My collabs</router-link>
        <router-link to="/creators">Creators</router-link>
        <router-link to="/about">Contacts</router-link>
        <router-link to="/login" v-if="!$store.getters.getIsLogined"> <span>Log in</span></router-link>
        <div class="user" v-if="$store.getters.getIsLogined" @click="routeToProfile">
          <img :src="$store.getters.getAvatar" alt="">
            <p>{{$store.getters.getUsername}}</p>
          <div class="signOut" @click="signOut">
            <p>Sign Out</p>
          </div>
        </div>
        
      </nav>
    </header>
    <router-view/>
    <footer>
      <router-link to="/"><img src="./assets/logo.png" alt=""></router-link>
      <p>All rights reserved</p>
    </footer>
  </div>
</template>

<script>

export default {

  data(){
    return{
      data: {
        type: Object
      },
      avatar: '',
    }
  },

  methods: {
    signOut(){
      this.$store.dispatch('deleteUser')
    },
    routeToProfile(){
      this.$router.push( {path: `/profile?id=${this.$store.getters.getUserId}`});
      // this.$router.go()
    }
  },

  created(){
    window.addEventListener('beforeunload', function (e) {
      this.$store.dispatch('deleteUser')
      e.preventDefault();
      e.returnValue = '';
    });
    
  }
}

  

</script>



<style lang="scss">

#app{
  height: 100%;
  overflow-x: hidden;
}

header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 1;
  justify-content: space-around;
  align-items: center;
  background-color: #363636;
  min-height: 75px;
  width: 100%;
  position: absolute;
  top: 0;
  img{
    height: 43px
  }

}

nav {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  a {
    font-size: 20px;
    color: #FFF;
    font-family: 'JetBrainsMono-Regular';
    text-decoration: none;
    margin: 0 40px;
  }
  span {
    color: #414141;
    font-size: 16px;
    background-color: #9AFFA4;
    padding: 9px 16px;
    border-radius: 21px;
  }
}

footer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #F8F8F8;
  height: 75px;
  p{
    font-family: 'JetBrainsMono-Regular';
    font-size: 16px;
    margin: 0 10px;
  }
}

.user{
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #FFF;


  font-family: 'JetBrainsMono-Regular';
  font-size: 16px;

  img{
    width: 50px;
    height: 50px;
    margin: 0 10px;
    border-radius: 100%;
  }
}

.signOut{
  display: none;
  position: absolute;
  background-color: #363636;
  text-align: center;
  width: 150px;
  top: 60px;
}

.user:hover .signOut{
  display: block;
}



@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  header{
    height: 200px;
    z-index: 5;
  }
}


</style>
