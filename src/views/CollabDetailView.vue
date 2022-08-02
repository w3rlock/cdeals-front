<template>
    <div class="wrap">
        <div class="desc">
            <p class="title">{{data.title}}</p>
            <p class="text">{{data.descr}}</p>
            <div class="people">
                <p>From: {{data.from_user}}</p>
                <p>To: {{data.to_user}}</p>
            </div>
            <div class="links">
                <p>Files</p>
                <a v-for="item in files" :key="item.id" :href="'http://78.40.109.118:3000/api/portfolio/'+item.f_name">{{item.f_name}}</a>
            </div>
        </div>
        <div class="action" v-if="selectedStatus=='done'">
            <p class="headText">Status: {{selectedStatus}}</p>
        </div>
        <div class="action" v-if="selectedStatus=='canceled'">
            <p class="headText">Status: {{selectedStatus}}</p>
        </div>
        <div class="action" v-if="selectedStatus!='done' && selectedStatus!='canceled'">
            <select name="status" id="status" v-model="selectedStatus">
                <option v-for="(item, idx) in status" :key="idx" :value="item">{{item}}</option>
            </select>
            <div>
                <input type="button" value="Change status" class="bgButton" @click="modalView()">
                <input type="button" value="Cancel collab" class="bgButton" @click="modalView('canceled')">
            </div>
        </div>

        <Modal v-show="showModal" @close-modal="showModal=false" :modalText="msg"/>
    </div>
</template>

<script>
import axios from 'axios'

import Modal from '@/components/Modal.vue';
    export default {
    name: "CollabDetail",
    components: { Modal },

    created(){
        axios.get(`http://78.40.109.118:3000/api/collabid?id=${this.$route.query.id}`)
        .then(res => {
            this.data = res.data;
            this.selectedStatus = this.data.c_status
        })

        axios.get(`http://78.40.109.118:3000/api/collabfiles?id=${this.$route.query.id}`)
        .then(res => {
            this.files = res.data;
            // console.log(this.files)
        })
    },

    data(){
        return{
            data:{
                type: Object
            },
            files: {
                type: Object
            },
            status: ['created', 'in process', 'done', 'canceled'],
            selectedStatus: '',
            showModal: false,
            msg: "Thank you for the collaboration You've earned +10 points",
            msgCancel: 'We are sorry that you could not implement the project. We hope you will find other like-minded people'
        }
    },
    methods: {
        async modalView(status){
            if(status == 'canceled'){
                this.selectedStatus = 'canceled'
            }
            await axios.put(`http://78.40.109.118:3000/api/changestatus`, {status: this.selectedStatus, id: this.$route.query.id})
            if(this.selectedStatus == 'done'){
                axios.put(`http://78.40.109.118:3000/api/userpoints`, {newPoints: 10, id: this.data.u_from})
                axios.put(`http://78.40.109.118:3000/api/userpoints`, {newPoints: 10, id: this.data.u_to})
                this.msg = "Thank you for the collaboration You've earned +10 points";
                this.showModal=true;
            }else if(this.selectedStatus == 'canceled'){
                this.msg = 'We are sorry that you could not implement the project. We hope you will find other like-minded people';
                this.showModal=true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

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

.wrap{
    display: flex;
    flex-direction: row;
    margin: 200px 15%;
    justify-content: space-around;
    flex-wrap: wrap;
}

.title{
    font-family: 'Poppins';
    font-size: 32px;
    margin: 0;
}
.text{
    font-family: 'Poppins';
    font-size: 24px;
    margin: 0;

}
.people{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Poppins';
    font-size: 20px;
    margin: 0;
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

  .bgButton{
    background-color: #5D5FEF;
    color: #FFF;
    font-family: 'Poppins';
    font-size: 24px;
    font-weight: bold;
    border: 0;
    margin: 15px;
    border-radius: 10px;
  }

  .bgButton:hover{
    background-color: #FFF;
    color: #5D5FEF;
  }

  .action{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrap{
    margin-top: 250px;
  }
}

</style>