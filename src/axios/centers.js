import axios from 'axios'
import { REQUEST_DIR } from '../utils/constants'
import {
  requestData,
  requestDataFormUrlEncoded,
} from './requestHeadersHelper'

export async function getCenters (page = 1) {
  const url = `${REQUEST_DIR}centros?page=${page}`
  const response = await axios.get(url, requestData())
  return response
}

export async function getCenter (id) {
  const url = `${REQUEST_DIR}centers/${id}`
  const response = await axios.get(url, requestData())
  return response
}

export async function postCenter (data) {
  const url = `${REQUEST_DIR}centros`
  const response = await axios.post(url, data, requestDataFormUrlEncoded())
  return response
}

export async function deleteCenter (id) {
  const url = `${REQUEST_DIR}centros/${id}`
  const response = await axios.delete(url, requestData())
  return response
}

export async function putCenter (data) {
  const url = `${REQUEST_DIR}centros/${data.id_centro}`
  const response = await axios.put(url, data, requestDataFormUrlEncoded())
  return response
}
