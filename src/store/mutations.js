
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
  setCategories (state, data) {
    state.categories = data
  },
  setCenters (state, data) {
    state.centers = data
  },
  setClasifications (state, data) {
    state.clasifications = data
  },
  setAntigens (state, data) {
    state.antigens = data
  },
  setHealthAreas (state, data) {
    state.healthAreas = data
  },
  setHealthStatuses (state, data) {
    state.healthStatuses = data
  },
}
