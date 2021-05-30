import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'
import axios from 'axios'


Vue.use(Vuex)
export default new Vuex.Store({
  
  state: {
    files: [],
    token: '',
    user: {}
  },

  mutations: {
    setFiles(state, files){
      state.files = files
    },
    
    setToken(state, token){
      state.token = token;
    },
    
    setUser(state, user){
      state.user = user;
    }
  },

  actions: {

    async loadStorage({commit}, user){
      let res= await axios.get(`/storage/find/${user}`)
      commit('setFiles', res.data.result)

    },
    
    saveToken({commit}, token){
      commit("setToken", token);
      commit("setUser", decode(token));
      window.localStorage.setItem("token", token)
      router.push({name: 'Home'}, () => {});
      
      return decode(token)
      
    },

    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        commit("setUser", decode(token));
        router.push({name: 'Home'}, () => {});
      }   
    },

    async logout({commit}, user){
      let res = await axios.post('/user/logout', {user})
      if(res){
        commit("setToken", '');
        commit("setUser", {});
        window.localStorage.removeItem("token");
        router.push({name: 'Home'}, () => {});
      }
     
    }
  },

  getters: {
    fastaFiles(state) {
      return state.files.filter(f => f.type == 'fasta')
    },

    fastqFiles(state) {
      return state.files.filter(f => f.type == 'fastq')
    },

    uploadedFiles(state) {
      return state.files.filter(f => f.category == 'uploaded')
    },
    
    resultFiles(state) {
      return state.files.filter(f => f.category == 'result')
    }
  }
})