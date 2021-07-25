import axios from 'axios'
import store from '@/store'
import { REQUEST_DIR } from '../utils/constants'
import { requestData } from './requestHeadersHelper'

export async function getCategories () {
  const url = `${REQUEST_DIR}nomenclador/categoria`
  const response = await axios.get(url, requestData())
  const categories = response.data
  store.commit('setCategories', categories)
  return response
}
export async function getAntigenos () {
  const url = `${REQUEST_DIR}nomenclador/antigeno`
  const response = await axios.get(url, requestData())
  const antigens = response.data
  store.commit('setAntigens', antigens)
  return response
}
export async function getSystemStatus () {
  const url = `${REQUEST_DIR}nomenclador/sistema`
  const response = await axios.get(url, requestData())
  store.commit('setSystemStatuses', response.data)
  return response
}
export async function getHealthStatus () {
  const url = `${REQUEST_DIR}nomenclador/estado`
  const response = await axios.get(url, requestData())
  const health = response.data
  store.commit('setHealthStatuses', health)
  return response
}
export async function getProvinces () {
  const url = `${REQUEST_DIR}nomenclador/provincia`
  const response = await axios.get(url, requestData())
   const provinces = response.data
   store.commit('setProvinces', provinces)
  return response
}
export async function getMunicipalities (id = 6) {
  const url = `${REQUEST_DIR}nomenclador/municipio/${id}`
  const response = await axios.get(url, requestData())
  const municipalities = response.data
  store.commit('setMunicipalities', municipalities)
  return response
}
export async function getClasifications () {
  const url = `${REQUEST_DIR}nomenclador/clasificacion`
  const response = await axios.get(url, requestData())
  const clasifications = response.data
  store.commit('setClasifications', clasifications)
  return response
}
export async function getHealthAreas (id = 1) {
  const url = `${REQUEST_DIR}nomenclador/salud/${id}`
  const response = await axios.get(url, requestData())
  const hAreas = response.data
  store.commit('setHealthAreas', hAreas)
  return response
}
