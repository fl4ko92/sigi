import Vue from 'vue'
import Vuex from 'vuex'
import Models from "../../models/Models";
import modules from '@/store'
import axios from 'axios'


Vue.use(Vuex)
const store = new Vuex.Store({
  modules,
  mutations: {
    async login(state, payload) {
      state = await Models.login(payload.axios, payload.name, payload.password)
      if (state.id === -1) {
        localStorage.setItem('token', null)
      } else {
        localStorage.setItem('token', state.token)
      }
    }
  },
  actions: {
    actionsLogin({commit}, payload) {
      commit('login', payload)
    },
  },
  getters: {
    getToken: state => {
      return state.token
    },
  }
})
export default store

