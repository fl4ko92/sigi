import axios from 'axios'
import store from '@/store'
import { REQUEST_DIR } from '../utils/constants'
import { requestData } from './requestHeadersHelper'

export async function getCategories () {
  const url = `${REQUEST_DIR}nomenclador/categoria`
  const response = await axios.get(url, requestData())
  return response
}
export async function getAntigenos () {
  const url = `${REQUEST_DIR}nomenclador/antigeno`
  const response = await axios.get(url, requestData())
  return response
}
export async function getSystemStatus () {
  const url = `${REQUEST_DIR}nomenclador/sistema`
  const response = await axios.get(url, requestData())
  return response
}
export async function getHealthStatus () {
  const url = `${REQUEST_DIR}nomenclador/salud`
  const response = await axios.get(url, requestData())
  return response
}
export async function getProvinces () {
  const url = `${REQUEST_DIR}nomenclador/provincia`
  const response = await axios.get(url, requestData())
   console.log(response)
   const provinces = response.data
   store.commit('setProvinces', provinces)
  return response
}
export async function getMunicipalities (id = 1) {
  const url = `${REQUEST_DIR}nomenclador/municipio/${id}`
  const response = await axios.get(url, requestData())
  return response
}
export async function getHealthAreas (id = 1) {
  const url = `${REQUEST_DIR}nomenclador/salud/${id}`
  const response = await axios.get(url, requestData())
  return response
}
