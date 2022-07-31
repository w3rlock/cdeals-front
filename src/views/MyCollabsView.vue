<template>
    <div class="wrap">
      <div v-show="this.$store.getters.getIsLogined">
        <p class="headText">
            My collabs
        </p>
        <div>
          <select name="status" id="status" v-model="selectedStatus" @change="filterStatus">
            <option v-for="(item, idx) in status" :key="idx" :value="item">{{item}}</option>
          </select>

            <div class="card" v-for="c in filtered" :key="c.id" @click="detailCollab(c.id)">
                <p class="title">{{c.title}}</p>
                <p class="desc">{{c.descr}}</p>
                <div class="people">
                    <p>From: {{c.from_user}}</p>
                    <p>To: {{c.to_user}}</p>
                </div>
            </div>

        </div>
      </div>
      <div v-show="!this.$store.getters.getIsLogined">
        <p class="headText">You have to login first</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'MyCollabs',

        data(){
          return {
            collabs: {
              type: Object
            },
            filtered:{
              type: Object
            },
            status: ['created', 'in process', 'done', 'canceled'],
            selectedStatus: ''
          }
        },
         created() {
          if(this.$store.getters.getIsLogined){
                axios.get(`http://localhost:3000/api/collabs/${this.$store.getters.getUserId}`)
                .then(response => {
                      this.collabs = response.data;
                      this.filtered = this.collabs;
                }).catch(error => {
                    console.log(error);
                });
          }
        },

        methods: {

          detailCollab(id){
            this.$router.push(`/collabdetail?id=${id}`)
          },

          filterStatus(){
            this.filtered = this.collabs.filter(item =>
                item.c_status.includes(this.selectedStatus)
            );
            console.log(this.filtered)
          },

          async getCollabs(e){
            await axios.get(`http://localhost:3000/api/collabs/${this.$store.getters.getUserId}`)
                .then(response => {
                      this.collabs = response.data;
                }).catch(error => {
                    console.log(error);
                });
          }
        }
    }
</script>

<style lang="scss" scoped>


.wrap{
    margin: 200px 20%;
}

.wrap>p{
    text-align: center;
}

  select {
    background-color: transparent;
    width: 250px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    color: #5D5FEF;
    font-family: 'Poppins';
    font-size: 20px;
    padding: 0 20px;
    margin: 10px 0;
  }

  .card{
    display: flex;
    flex-direction: column;
    border: 3px solid #ebebeb;
    border-radius: 49px;
    width: 619px;
    height: 230px;
    padding: 20px;
    align-items:flex-start;
    justify-content: space-around;
    margin: 20px 0;
    text-decoration: none;
  }

  .card:hover{
    border: 3px solid #95A6FF;
  }


  .title{
    font-family: 'Poppins';
    font-size: 32px;
    margin: 0;
  }

  .desc{
    font-family: 'Poppins';
    font-size: 24px;
    margin: 0;
  }

  .people{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    font-family: 'Poppins';
    font-size: 20px;
    margin: 0;
  }

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin: 250px 5% 0 5%;
  }

  .card{
    width: 300px;
  }
}

</style>