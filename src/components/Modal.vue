<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <p>{{modalText}}</p>
      <button @click="$emit('close-modal')">Thank you</button>
    </div>
  </div>
</template>


<script>
    export default {
        name: 'Modal',
        props: ['modalText']
    }
</script>

<style lang="scss" scoped>
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
    height: 300px;
    width: 430px;
    margin-top: 10%;
    padding: 60px 0;
    border-radius: 20px;
    }


    p {
    text-align: left;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 32px;
    margin: 20px 30px;
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
    width: 150px;
    }

    @media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .modal{
    margin-top: 50%;
    height: 350px;
  }
}
</style>