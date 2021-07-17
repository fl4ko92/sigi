import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./src/store/index";
import Vuebar from "vuebar";
import axios from 'axios';
import "./plugins/base";
import api from './src/utils/api';


Vue.config.productionTip = false;
Vue.use(Vuebar);

Vue.prototype.$axios = api

new Vue({
    vuetify,
    store,
    axios,
    router,
    render: (h) => h(App),
}).$mount("#app");
