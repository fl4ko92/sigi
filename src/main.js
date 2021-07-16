import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import Vuex from 'vuex'
import Toast from 'vue-toastification'
import store from '@/store'
import 'vue-toastification/dist/index.css'
import VueI18n from 'vue-i18n'

Vue.use(Vuex)
Vue.use(VueI18n)

Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})
const i18n = new VueI18n({
  locale: 'es',
})

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

i18n.locale = 'es'
