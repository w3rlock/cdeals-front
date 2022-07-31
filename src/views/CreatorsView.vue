<template>
  <div class="main">
    <p class="headText">Collaborate</p>

    <div class="wrap3">

      <div class="filter">
        <p>Filters</p>
        <select name="role" id="role" v-model="selectedRole" @change="getCategories">
            <option v-for="item in roles" :key="item.id" :value="item.id">{{item.role_name}}</option>
        </select>

        <select name="category" id="category" v-model="selectedCategory" @change="getListOfCreators">
            <option v-for="item in category" :key="item.id" :value="item.id">{{item.category}}</option>
        </select>

        <input type="button" class="bgButton" value="Clear filters" @click="clearFilters">
      </div>

      <div>
        <p>Creators</p>
        <input type="text" placeholder="Search" v-model.trim="search" v-on:keyup.enter="getListOfCreators">
        <div style="padding: 0 25px" class="cardContainer" v-if="listOfUser != null">
        <CreatorCard
        v-for="user  in listOfUser"
        :key="user.id"
        :data="user"
        />
      </div>
      </div>

      

    </div>

  </div>
</template>

<script>
import CreatorCard from '@/components/CreatorCard.vue'
import axios from 'axios'


export default {
  name: 'CreatorsView',
  components: {
    CreatorCard
  },
  data(){
    return {
      listOfUser: null,
      roles: null,
      selectedRole: null,
      category: null,
      selectedCategory: -1,
      search: '',
    }
  },
  created() {
        axios.get('http://localhost:3000/api/userlistportfolio?category=-1')
          .then(response => {
              this.listOfUser = response.data;
          }).catch(error => {
              console.log(error);
          });

          axios.get('http://localhost:3000/api/category').then(res => {
            this.roles = res.data;
          })
    },

  methods: {
    async getCategories(e){
          e.preventDefault();
          await axios.get(`http://localhost:3000/api/roles/?id=${this.selectedRole}`)
          .then(res => {
            this.category = res.data
          })
    },

    clearFilters(){
        this.selectedRole = null;
        this.selectedCategory = -1;
        this.getListOfCreators()
    },

    async getListOfCreators(e){
      await axios.get(`http://localhost:3000/api/userlistportfolio?category=${this.selectedCategory}`)
          .then(response => {
              if (this.search) {
                this.listOfUser = response.data.filter(item =>
                item.username.toLowerCase().includes(this.search.toLowerCase())
                );
              } else {
                this.listOfUser = response.data;
              }
          }).catch(error => {
              console.log(error);
          });

    }
  }
}
</script>

<style lang="scss" scoped>

  .main{
    margin: 150px 0;
    padding: 0 13%;
  }

  .main>p{
    text-align: center;
  }

  .wrap3 {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;  
  }

  .wrap3 p {
    font-family: 'Poppins';
    font-size: 32px;
  }

  input {
    width: 300px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    font-size: 20px;
    font-family: 'Poppins';
    padding: 0 20px;
    color: #5D5FEF;
    margin: 30px 0;
  }

  .filter{
    display: flex;
    flex-direction: column;
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

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .main{
    margin-top: 250px;
  }

}

</style>
