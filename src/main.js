import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import Vuex from 'vuex'
import Toast from 'vue-toastification'
import store from '@/store'
import Vuebar from 'vuebar'
import 'vue-toastification/dist/index.css'
import axios from 'axios'
import api from '@/utils/api'
import { encrypt } from './utils/enc'

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.use(Vuebar)

Vue.prototype.$axios = api
localStorage.setItem('tkn', encrypt('pepe'))

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})

new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
