import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//axios.defaults.baseURL='http://localhost:4000/api'
axios.defaults.baseURL='http://192.168.12.68:4000/api'
//axios.defaults.baseURL='http://192.168.22.26:4000/api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
