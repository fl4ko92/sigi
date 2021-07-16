import axios from 'axios'
import { REQUEST_DIR } from '../utils/constants'
import { requestData, requestDataFormUrlEncoded } from './requestHeadersHelper'
import queryString from 'query-string'

export async function getPatients (page = 1) {
  const url = `${REQUEST_DIR}pacientes?page=${page}`
  const response = await axios.get(url, requestData())
  return response
}

export async function getPatient (id) {
  const url = `${REQUEST_DIR}pacientes/${id}`
  const response = await axios.get(url, requestData())
  return response
}

export async function postPatient (data) {
  const url = `${REQUEST_DIR}pacientes`
  data = queryString.stringify(data)
  const response = await axios.post(url, data, requestDataFormUrlEncoded())
  return response
}

export async function deletePatient (id) {
  const url = `${REQUEST_DIR}pacientes/${id}`
  const response = await axios.delete(url, requestData())
  return response
}

export async function putPatient (data) {
  const url = `${REQUEST_DIR}pacientes/${data.id_paciente}`
  data = queryString.stringify(data)
  const response = await axios.put(url, data, requestDataFormUrlEncoded())
  return response
}
