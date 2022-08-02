<template>
  <div>
    <div id="banner">
      <!-- <img src="../assets/background.png" alt=""> -->
      <h1>Find creative <br> people and create</h1>
      <br>
      <button @click="find">Find</button>
    </div>
    <TopCreators/>
  </div>
</template>

<script>
import TopCreators from '@/components/TopCreators.vue'

export default {
    name: "HomeView",
    components: { TopCreators },
    methods:{
      find(){
        this.$router.push('/creators')
      }
    }
}

</script>

<style>
  #banner{
    display: flex;
    flex-direction: column;
    background-image: url('../assets/background.png');
    background-size: cover;
    height: 1080px;
    min-height: 100%;
    align-items: left;
    justify-content: center;
    padding: 0 15%;
  }
  h1 {
    font-family: 'Lemon';
    font-size: 64px;
    color: #FFF;
  }
  button {
    width: 140px;
    height: 50px;
    background-color: #9AFFA4;
    border-radius: 20px;
    border: 0px;
    font-size: 20px;
    font-family: 'JetBrainsMono-Regular';
  }

</style>
