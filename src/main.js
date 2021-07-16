import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import Vuex from 'vuex'
import Toast from 'vue-toastification'
import store from '@/store'
import 'vue-toastification/dist/index.css'

Vue.use(Vuex)

Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
