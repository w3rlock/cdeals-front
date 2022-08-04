import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isLogined: localStorage.getItem('isLogined'),
      user_id: localStorage.getItem('user_id'),
      avatar: localStorage.getItem('avatar'),
      username: localStorage.getItem('username')
  },
  getters: {
    getUserId: (state) => state.user_id,
    getIsLogined: (state) => state.isLogined,
    getAvatar: (state) => state.avatar,
    getUsername: (state) => state.username,
  },
  mutations: {
    setUserId(state, user){
      state.user_id=user.id;
      state.isLogined=true;
      state.username = user.username;
      localStorage.setItem('username', JSON.stringify(state.username).replace('"', '').replace('"', ''));
      localStorage.setItem('user_id', JSON.stringify(state.user_id));
      localStorage.setItem('isLogined', JSON.stringify(state.isLogined));
    },
    setAvatar(state, img){
      state.avatar = img;
      localStorage.setItem('avatar', JSON.stringify(state.avatar).replace('"', '').replace('"', ''));
    },
    deleteUserId(){
      this.state.user_id = null;
      this.state.isLogined = false;
      this.state.avatar = '';
      this.state.username = '';
      localStorage.removeItem('user_id');
      localStorage.removeItem('isLogined');
      localStorage.removeItem('avatar');
      localStorage.removeItem('username');
    }
  },
  actions: {
    async onLogin({commit}, {email, password}){
      return await axios.post('http://78.40.109.118:3000/api/user/login', {email, password})
        .then(response => {
            commit('setUserId', response.data.user[0]);
                axios.get(`http://78.40.109.118:3000/api/userportfolio?id=${response.data.user[0].id}`)
                .then(res => {
                    commit('setAvatar', `http://78.40.109.118:3000/api/portfolio/${res.data.img}`);
                    // this.state.avatar = `http://78.40.109.118:3000/api/portfolio/${res.data.img}`
                    // localStorage.setItem('avatar', JSON.stringify(this.state.avatar));
                }).catch(error => {
                    console.log(error);
                });
            router.push(`/`);
            return response
        })
        .catch(error => {
            // console.log(error);
            return error
        });
    },

    deleteUser({commit}){
      commit('deleteUserId');
      router.push(`/login`);
    },

    setUserAvatar({commit}, {img}){
      console.log(img)
      commit('setAvatar', `http://78.40.109.118:3000/api/portfolio/${img}`);
    }
  },
  modules: {
  }
})
