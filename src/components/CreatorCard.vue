<template>
    <!-- <router-link to='/profile/data.user_id' style="text-decoration: none; color: inherit;"> -->
        <div class="wrap card" @click="routeToDetail">
            <img :src="'http://78.40.109.118:3000/api/portfolio/'+data.img" alt="">
            <div style="overflow: hidden; width: 100%">
                <div class="wrap2">
                    <p class="username">{{data.username}}</p>
                    <span class="pointCont"><p class="points">{{data.points}}</p></span>
                </div>
                <div class="description">
                    <p>{{data.category}}</p>
                    <p>{{data.about}}</p>
                </div>
            </div>
        </div>
    <!-- </router-link> -->
</template>

<script>

    export default {
        name: 'CreatorCard',
        props: {
            data: {
                type: Object
            }
        },

        methods: {
            routeToDetail(){
                this.$router.push(`/profile?id=${this.data.id}`);
            }
        }
        // mounted: function () {
        //     console.log(this.data)
        // }
    }
</script>


<style lang="scss" scoped>

img{
    width: 170px;
    height: 170px;
    border-radius: 50px;
}

.wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: space-around;
    //flex-wrap: wrap;
}

.wrap2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
}

.card {
    width: 500px;
    height: 200px;
    border: 2px solid #EBEBEB;
    border-radius: 50px;
    padding: 0 15px;
    margin: 10px 20px;
}

.card:hover {
    background-color: #9AFFA4;
}

.username{
    font-family: 'Poppins';
    font-weight: bold;
    font-size: 30px;
    color: #414141;
    width: 250px;
    overflow: hidden;
}

.points {
    font-family: 'Poppins', 'Nunito', sans-serif;
    font-size: 24px;
    color: #414141;
    
}
.pointCont{
    display: flex;
    justify-content: center;
    width: 47px;
    height: 47px;
    background-color: #9AFFA4;
    border-radius: 100%;
    align-items: center;
}

.description {
    font-size: 16px;
    font-family: 'Poppins', 'Nunito', sans-serif;
    color: #414141;
    padding: 0 20px;
    width: 100%;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    flex-direction: column;
  }
}

</style>