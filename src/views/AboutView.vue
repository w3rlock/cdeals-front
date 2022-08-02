<template>
  <div class="wrap">
    <p class="headText">Contact with us</p>
    <p class="contact">8 (777) 123 25 56</p>
    <p class="contact">info@cdeals.com</p>
  </div>
</template>

<script>

export default {
  name: 'ContactsView',
  components: {
  },
  data(){
    return{
    }
  },

  methods:{
    
  },

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

    .contact{
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 20px;
    }



@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  input{
    width: 250px;
  }
}

</style>
