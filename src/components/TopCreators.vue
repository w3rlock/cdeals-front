<template>
    <div class="wrap3">
      <p class="headText">Top creators of MOVIE</p>
      <div style="padding: 0 25px" class="cardContainer" v-if="movieList != null">
        <CreatorCard
        v-for="user  in movieList"
        :key="user.id"
        :data="user"
        />
      </div>

      <p class="headText">Top creators of MUSIC</p>
      <div style="padding: 0 25px" class="cardContainer" v-if="musicList != null">
        <CreatorCard
        v-for="user  in musicList"
        :key="user.id"
        :data="user"
        />
      </div>

      <p class="headText">Top creators of ART</p>
      <div style="padding: 0 25px" class="cardContainer" v-if="artList != null">
        <CreatorCard
        v-for="user  in artList"
        :key="user.id"
        :data="user"
        />
      </div>

    </div>
</template>

<script>
import CreatorCard from './CreatorCard.vue'
import axios from 'axios'

export default {
    name: 'TopCreators',
    components: { CreatorCard },

    data(){
      return {
        numOfCards: 4,
        listOfUser: null,
        musicList: null,
        artList: null,
        movieList: null,
      }
    },

    created() {
        axios.get('http://78.40.109.118:3000/api/userlistportfolio?category=-1&role=-1')
          .then(response => {
              this.listOfUser = response.data;
              this.movieList = this.listOfUser.filter(listOfUser => listOfUser.role == 2)
              this.musicList = this.listOfUser.filter(listOfUser => listOfUser.role == 1)
              this.artList = this.listOfUser.filter(listOfUser => listOfUser.role == 3)
              // console.log(this.listOfUser);
          }).catch(error => {
              console.log(error);
          });
    },

    methods: {
      
    }
}
</script>

<style lang="scss" scoped>

  .wrap3 {
    padding: 0 10%;
  }

  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
  }

</style>