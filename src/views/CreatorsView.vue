<template>
  <div class="main">
    <!-- <p class="headText">Creators</p> -->

    <div class="wrap3">

      <div class="filter">
        <p>Filters</p>
        <select name="role" id="role" v-model="selectedRole" @change="getCategories">
            <option value="-1" disabled selected>Categories</option>
            <option v-for="item in roles" :key="item.id" :value="item.id">{{item.role_name}}</option>
        </select>

        <select name="category" id="category" v-model="selectedCategory">
            <option value="-1" disabled selected>Roles</option>
            <option v-for="item in category" :key="item.id" :value="item.id">{{item.category}}</option>
        </select>
        <input type="button" class="bgButton" value="Find" @click="getListOfCreators">

        <input type="button" class="bgButton" value="Clear filters" @click="clearFilters">
      </div>

      <div class="creators">
        <p>Creators</p>
        <div style="display: flex; flex-direction: row; align-items: center;">
          <input type="text" placeholder="Search" class="search" v-model="search" v-on:keyup.enter="getListOfCreators">
          <input type="button" class="searchButton" value="Find" @click="getListOfCreators">
        </div>
        <div class="cardContainer" v-if="listOfUser != null">
          <CreatorCard class="cards"
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
      selectedRole: -1,
      category: null,
      selectedCategory: -1,
      search: '',
    }
  },
  created() {
        axios.get('http://78.40.109.118:3000/api/userlistportfolio?category=-1&role=-1')
          .then(response => {
              this.listOfUser = response.data;
          }).catch(error => {
              console.log(error);
          });

          axios.get('http://78.40.109.118:3000/api/category').then(res => {
            this.roles = res.data;
          })
    },

  methods: {
    async getCategories(e){
          e.preventDefault();
          await axios.get(`http://78.40.109.118:3000/api/roles/?id=${this.selectedRole}`)
          .then(res => {
            this.category = res.data
          })
    },

    clearFilters(){
        this.selectedRole = -1;
        this.selectedCategory = -1;
        this.getListOfCreators()
    },

    async getListOfCreators(e){
      await axios.get(`http://78.40.109.118:3000/api/userlistportfolio?category=${this.selectedCategory}&role=${this.selectedRole}`)
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
      this.search=''
    }
  }
}
</script>

<style lang="scss" scoped>

  .main{
    margin: 150px 0;
    padding: 0 5%;
    min-height: 100%;
  }

  .cardContainer{
    width: 500px;
  }
  
  .main>p{
    text-align: center;
  }

  .cards{
    margin-left: 0;
  }

  .wrap3 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .wrap3 p {
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 26px;
    padding: 0;
    margin: 0;
  }

  .search {
    width: 300px;
    height: 30px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    font-size: 16px;
    font-family: 'Poppins', 'Nunito', sans-serif;
    padding: 0 20px;
    color: #5D5FEF;
    margin: 30px 0;
  }

  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: bold;
    border: 0;
    border-radius: 5px;
    width: 120px;
    margin: 5px 0;
  }

  .searchButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: bold;
    border: 0;
    border-radius: 5px;
    width: 80px;
    height: 30px;
    margin: 0 5px;
  }

  .filter{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px;
    // background-color: #F2F2F2;
    height: 250px;
    width: 200px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2); 
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  }

  select {
    background-color: transparent;
    width: 170px;
    height: 40px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    background-color: #fff;
    color: #5D5FEF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 16px;
    padding: 0 10px;
    margin: 5px 0;
  }
  .creators{
    margin: 0 25px;
    width: 700px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2); 
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  }

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .main{
    margin-top: 250px;
  }

}

</style>
