import axios from 'axios'
import { REQUEST_DIR } from '../utils/constants'
import { requestData, requestDataFormUrlEncoded } from './requestHeadersHelper'
import queryString from 'query-string'

export async function getAreas (idCenter, page = 1) {
  const url = `${REQUEST_DIR}centros/${idCenter}/areas?page=${page}`
  const response = await axios.get(url, requestData())
  return response
}

export async function getArea (id) {
  const url = `${REQUEST_DIR}areas/${id}`
  const response = await axios.get(url, requestData())
  return response
}

export async function postArea (data) {
  const url = `${REQUEST_DIR}/areas`
  data = queryString.stringify(data)
  const response = await axios.post(url, data, requestDataFormUrlEncoded())
  return response
}

export async function deleteArea (idCenter, id) {
  const url = `${REQUEST_DIR}centros/${idCenter}/areas/${id}`
  const response = await axios.delete(url, requestData())
  return response
}

export async function putArea (data) {
  const url = `${REQUEST_DIR}areas/${data.id_area}`
  data = queryString.stringify(data)
  const response = await axios.put(url, data, requestDataFormUrlEncoded())
  return response
}
