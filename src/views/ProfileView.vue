<template>
  <div  class="wrap">
    <div class="cont">
        <p class="headText">Profile</p>
        <input type="button" value="Edit profile" class="bgButton" @click="editProfile" v-if="data.id == this.$store.getters.getUserId" >
        <input type="button" value="Offer to collaborate" class="bgButton" @click="showModal=true" v-if="this.$store.getters.getIsLogined">
    </div>

    <div class="cont">
        <img :src="'http://localhost:3000/api/portfolio/'+data.img" alt="">

        <div class="mainCont">
            <div class="cont contName">
                <p class="headText">{{data.username}}</p>
                <p class="name">{{data.first_name}} {{data.last_name}}</p>
                <div class="pointCont">
                    <p>{{data.points}}</p>
                </div>
            </div>

            <div class="description">
                <p>{{data.category}}</p>
                <p>{{data.about}}</p>
            </div>
        </div>

        <div class="contacts">
            <p class="headText">Contacts</p>
            <div>
                <p>{{data.phone}}</p>
                <p>{{data.email}}</p>
            </div>
        </div>
    </div>

    <div>
        <div class="cont">
            <p class="headText">Portfolio</p>
            <router-link to="/editportfolio" v-if="data.id == this.$store.getters.getUserId"><input type="button" value="Edit portfolio" class="bgButton"></router-link>
        </div>

        <div class="links">
                <p>Links</p>
                <a v-for="item in links" :key="item.id" :href="item.l_name">{{item.l_name}}</a>
            </div>

            <div class="links">
                <p>Files</p>
                <a v-for="item in files" :key="item.id" :href="'http://localhost:3000/api/portfolio/'+item.f_name">{{item.f_name}}</a>
            </div>
    </div>

    <ModalCollab v-show="showModal" @close-modal="showModal=false"/>

  </div>
</template>

<script>
import ModalCollab from '@/components/ModalCollab.vue'
import axios from 'axios'



export default {
  name: 'ProfileView',
  components: {
    ModalCollab
},
  data(){
    return{
        showModal: false,
        data: {
            type: Object
        },
        links: {
            type: Object
        },
        files: {
            type: Object
        },
    }
  },


  methods: {
    editProfile(){
        this.$router.push(`/editprofile?id=${this.$store.getters.getUserId}`)
    },

    editPortfolio(){
        this.$router.push(`/editprofile?id=${this.$store.getters.getUserId}`)
    }
  },

  created(){
    
    axios.get(`http://localhost:3000/api/userportfolio?id=${this.$route.query.id}`)
          .then(response => {
              this.data = response.data;
          }).catch(error => {
              console.log(error);
          });

    axios.get(`http://localhost:3000/api/links/${this.$route.query.id}`)
    .then(res => {
        this.links = res.data;
        // console.log(this.links)
    })

    axios.get(`http://localhost:3000/api/files?id=${this.$route.query.id}`)
    .then(res => {
        this.files = res.data;
        // console.log(this.files)
    })

  }
}
</script>

<style lang="scss" scoped>

  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins';
    font-size: 24px;
    font-weight: bold;
    border: 0;
    height: 40px;
    border-radius: 15px;
    margin: 0 10px;
  }

.wrap{
    margin: 100px 0;
    padding: 0 13%;
}

.cont{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

.cont img{
    border-radius: 100%;
    width: 180px;
    height: 180px;
}

.contName {
    justify-content: space-between;
    flex-wrap: wrap;
}

.mainCont {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 20px;
}

.name {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
}

.pointCont {
    width: 47px;
    height: 47px;
    background-color: #9AFFA4;
    border-radius: 100%;
    font-size: 24px;
    font-family: 'Poppins';
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.description {
    font-family: 'Poppins';
    font-size: 20px;
}

.contacts{
    margin: 0 50px;
    p{
        font-family: 'Poppins';
        font-size: 32px;
        margin: 0;
    }
}

.links{
    display: flex;
    flex-direction: column;

    p{
        font-family: 'Poppins';
        font-size: 20px;
    }

    a{
        text-decoration: none;
        font-family: 'Poppins';
        font-size: 16px;
        margin: 5px
    }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 200px;
  }
}

</style>
