/*
export default {
  async actionsLogin ({ commit }, payload) {
    state = await Models.login(payload.axios, payload.name, payload.password)
    state = await User.login(payload.axios, payload.name, payload.password)
    if (state.id === -1) {
      localStorage.setItem('token', null)
    } else {
      localStorage.setItem('token', state.token)
    }
  },
} */
