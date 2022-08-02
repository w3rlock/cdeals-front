<template>
  <div class="wrap">
    <p class="headText">Edit portfolio</p>

    <form>

        <img :src="$store.getters.getAvatar" alt="" height="160" width="160" id="blah">

        <label for="fileUpload" class="fileType bgButton">Upload Avatar</label>
        <input type="file" id="fileUpload"  name="avatar" @change="readURL">
           
        <select name="role" id="role" v-model="selectedRole" @change="getCategories">
            <option v-for="item in roles" :key="item.id" :value="item.id">{{item.role_name}}</option>
        </select>

        <select name="category" id="category" v-model="selectedCategory">
            <option v-for="item in category" :key="item.id" :value="item.id">{{item.category}}</option>
        </select>

        <textarea name="about" id="about" cols="30" rows="10" placeholder="About yourself" v-model="data.about"></textarea>
        <p class="lab">Portfolio</p>
        <input type="button" value="Add link" class="bgButton" @click="addLink">
        <a v-for="item in links" :key="item.id" class="links" :href="item.l_name">{{item.link_name}}</a>
        <input v-for="l in newLinks" :key="l.id" type="text" :name="l.id" v-model="l.l_name" placeholder="Link">

        <p class="lab">Add file</p>
        <label for="filePortfolio" class="fileType bgButton">Upload file</label>
        <input type="file" id="filePortfolio" name="portfile" multiple>
        



      <input type="submit" value="SEND" class="bgButton" @click="updatePortfolio">

    </form>

  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'EditPortfolioView',
  components: {

  },
  data(){
    return{
      data:{
        type: Object
      },
      roles: null,
      category: null,
      selectedRole: null,
      selectedCategory: null,
      numOfLinks: 1,
      links: {
        type: Object
      },
      newLinks: [
      ]
    }
  },

  created(){
    axios.get(`http://78.40.109.118:3000/api/portfolio?id=${this.$store.getters.getUserId}`)
    .then(res => {
      this.data = res.data[0];
      this.selectedRole = this.data.role;
      this.selectedCategory = this.data.category;

      axios.get(`http://78.40.109.118:3000/api/roles/?id=${this.selectedRole}`)
          .then(res => {
            this.category = res.data
          })

    })

    axios.get('http://78.40.109.118:3000/api/category').then(res => {
        this.roles = res.data;
    })

    axios.get(`http://78.40.109.118:3000/api/links/${this.$store.getters.getUserId}`).then(res => {
        this.links = res.data;
        const ids = this.links.map(object => {
          return object.id;
        });
        this.numOfLinks = Math.max(...ids)+1;
        this.newLinks.push({id: this.numOfLinks, l_name: ""});
    })
  },

  methods: {

        addLink(){
          this.numOfLinks++;
          this.newLinks.push({id: this.numOfLinks, l_name: ""});
        },

        async updatePortfolio(e){
          e.preventDefault();
          const formData = new FormData(document.querySelector('form'));
          formData.append('user_id', this.$store.getters.getUserId);
          formData.append('links', this.newLinks.map(item => item.l_name));
          // for (var pair of formData.entries()) {
          //   if(pair[0] == "avatar" && Object.keys(pair[1]).length == 0){
          //     console.log("not avatar")
          //   }
          // }
          await axios.put(`http://78.40.109.118:3000/api/portfolio/`, formData)
          .then(res => {
            console.log(res.data)
            this.$store.dispatch('setUserAvatar', {img: res.data})
            this.$router.push(`/profile/?id=${this.$store.getters.getUserId}`)
          })
        },
        
         readURL(event) {
            console.log(event.target.files[0].name);
        },

        async getCategories(e){
          e.preventDefault();
          console.log(this.selectedRole);
          await axios.get(`http://78.40.109.118:3000/api/roles/?id=${this.selectedRole}`)
          .then(res => {
            this.category = res.data
          })
        }
  }
}
</script>

<style lang="scss" scoped>

  .wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    margin: 100px 0;

  } 

  form{
    display: flex;
    flex-direction: column;
    min-height: 1500px;
    justify-content: space-around;
    align-items: center;
  }

  input {
    width: 400px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;

    font-size: 20px;
    font-family: 'Poppins', 'Nunito', sans-serif;
  }

  .icon-inside {
    position: relative;
    margin: 20px;
  }

  .fileType{
    padding: 5px 10px;
    border-radius: 10px;
  }

  input[type="file"]{
        display: none;
  }


  .icon-inside i {
    position:absolute;
    left:0;
    top:10px;
    padding:10px 15px;
    color:#5D5FEF;
  }

  .icon-inside input {
    color: #5D5FEF;
    padding-left: 40px;
  }


  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border: 0;
  }

  .nobgButton{
    background-color: transparent;
    border: 0;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
    color: #5D5FEF;
  }

  select {
    background-color: transparent;
    width: 250px;
    height: 50px;
    border: 2px solid #DADADA;
    border-radius: 8px;
    color: #5D5FEF;
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 20px;
  }

    textarea{
        background-color: transparent;
        border: 2px solid #DADADA;
        border-radius: 8px;
        color: #5D5FEF;
        font-size: 20px;
        font-family: 'Poppins', 'Nunito', sans-serif;
    }

    .lab{
        font-family: 'Poppins', 'Nunito', sans-serif;
        font-size: 20px;
        color: #5D5FEF;

    }
    .links{
      width: 500px;
      // overflow: hidden;
      font-family: 'Poppins', 'Nunito', sans-serif;
      font-size: 16px;
      color: #5D5FEF;
      text-decoration: none;
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 200px;
  }
  input{
    width: 250px;
  }
}

</style>
