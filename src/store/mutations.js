
export default {
  setDrawer (state) {
    state.drawer = !state.drawer
  },
  setSystemStatuses (state, data) {
    state.systemStatuses = data
  },
  setProvinces (state, data) {
    state.provinces = data
  },
  setMunicipalities (state, data) {
    state.municipalities = data
  },
}
