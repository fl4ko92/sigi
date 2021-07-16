import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from "./store/index";
import './plugins'
import axios from 'axios';
import Vuex from 'vuex'
import api from './utils/api';
Vue.use(Vuex)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}


Vue.prototype.$axios = api

new Vue({
    vuetify,
    store,
    axios,
    router,
    render: (h) => h(App),
}).$mount("#app");
