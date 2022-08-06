<template>
  <div  class="wrap">
    <div class="cont">
        <p class="headText">Profile</p>
        <input type="button" value="Edit profile" class="bgButton" @click="editProfile" v-if="data.id == this.$store.getters.getUserId" >
        <input type="button" value="Offer to collaborate" class="bgButton" @click="showModal=true" v-if="this.$store.getters.getIsLogined && data.id != this.$store.getters.getUserId">
    </div>

    <div class="cont">
        <img :src="'http://78.40.109.118:3000/api/portfolio/'+data.img" alt="">

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

        <div class="filesAndLinks">
            <div class="links">
                    <p class="headText">Links</p>
                    <a v-for="item in links" :key="item.id" :href="item.l_name">{{item.link_name}}</a>
                </div>

                <div class="links">
                    <div>
                        <p class="headText">Video</p>
                        <!-- <a v-for="item in files" :key="item.id" :href="'http://78.40.109.118:3000/api/portfolio/'+item.f_name">{{item.f_name}}</a> -->
                        <div v-for="item in files" :key="item.id">
                            <video class="portVideo" controls v-if="isVideo(item.f_name)">
                            <source :src="'http://78.40.109.118:3000/api/portfolio/'+ item.f_name" type="video/mp4">
                            </video>
                        </div>
                    </div>

                    <div>
                        <p class="headText">Image</p>
                        <!-- <a v-for="item in files" :key="item.id" :href="'http://78.40.109.118:3000/api/portfolio/'+item.f_name">{{item.f_name}}</a> -->
                        <div v-for="item in files" :key="item.id">
                            <img class="portImg" v-if="isImage(item.f_name)" :src="'http://78.40.109.118:3000/api/portfolio/'+ item.f_name">
                        </div>
                    </div>

                    <div>
                        <p class="headText">Audio</p>
                        <div v-for="item in files" :key="item.id">
                            <audio controls v-if="isAudio(item.f_name)">
                                <source :src="'http://78.40.109.118:3000/api/portfolio/'+ item.f_name">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>

                     <div>
                        <p class="headText">Other</p>
                        <div v-for="item in files" :key="item.id">
                            <a v-if="isOther(item.f_name)" :href="'http://78.40.109.118:3000/api/portfolio/'+item.f_name">{{item.f_name}}</a>
                        </div>
                    </div>
                    
                    
                </div>
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
    },

    isVideo(filename) {
         if(/\.mp4$/i.test(filename) || /\.mov$/i.test(filename) || /\.mpeg-2$/i.test(filename)){
            return true;
        }
    },

    isImage(filename){
        if(/\.png$/i.test(filename) || /\.jpg$/i.test(filename) || /\.jpeg$/i.test(filename)){
            return true;
        }
    },

    isAudio(filename){
        if(/\.m4a$/i.test(filename) || /\.mp3$/i.test(filename) || /\.wav$/i.test(filename) || /\.aac$/i.test(filename)){
            console.log(filename)
            return true;
        }
    },
    isOther(filename){
        if(!(/\.m4a$/i.test(filename) 
        || /\.mp3$/i.test(filename) 
        || /\.wav$/i.test(filename) 
        || /\.aac$/i.test(filename)
        || /\.mp4$/i.test(filename) 
        || /\.mov$/i.test(filename)
        || /\.mpeg-2$/i.test(filename)
        || /\.png$/i.test(filename) 
        || /\.jpg$/i.test(filename) 
        || /\.jpeg$/i.test(filename)
        )){
            return true;
        }
    }
  },

  created(){
    
    axios.get(`http://78.40.109.118:3000/api/userportfolio?id=${this.$route.query.id}`)
          .then(response => {
              this.data = response.data;
          }).catch(error => {
              console.log(error);
          });

    axios.get(`http://78.40.109.118:3000/api/links/${this.$route.query.id}`)
    .then(res => {
        this.links = res.data;
        // console.log(this.links)
    })

    axios.get(`http://78.40.109.118:3000/api/files?id=${this.$route.query.id}`)
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
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border: 0;
    height: 40px;
    border-radius: 15px;
    margin: 0 10px;
  }

.wrap{
    margin: 100px 0;
    padding: 0 10%;
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
    font-family: 'Poppins', 'Nunito', sans-serif;
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
    font-family: 'Poppins', 'Nunito', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.description {
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
}

.contacts{
    margin: 0 50px;
    p{
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 20px;
        margin: 0;
    }
}

.links{
    display: flex;
    flex-direction: column;

    p{
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 20px;
    }

    a{
        text-decoration: none;
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 16px;
        margin: 5px;
        color:#5D5FEF;
    }
}

.filesAndLinks{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
}

.portImg{
    padding: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2); 
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    width: 500px;
    margin: 10px;
}
.portVideo{
    width: 600px;
    margin: 10px;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 200px;
    padding: 0 5%;
  }
}

@media only screen and (max-width: 1300px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 200px;
    padding: 0 5%;
  }
}

</style>
