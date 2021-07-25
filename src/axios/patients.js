import axios from 'axios'
import { REQUEST_DIR } from '../utils/constants'
import { requestData, requestDataFormUrlEncoded } from './requestHeadersHelper'

export async function getPatients (filters) {
  const url = `${REQUEST_DIR}pacientes`
  const response = await axios.get(url, requestData(filters))
  return response
}

export async function getPatient (id) {
  const url = `${REQUEST_DIR}pacientes/${id}`
  const response = await axios.get(url, requestData())
  return response
}

export async function postPatient (data) {
  const url = `${REQUEST_DIR}pacientes`
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
  const response = await axios.put(url, data, requestDataFormUrlEncoded())
  return response
}

export async function assignatePatient (idCenter, idPatient) {
  const url = `${REQUEST_DIR}asignar-pacientes`
  const data = {
    id_centro: idCenter,
    id_paciente: idPatient,
  }
  const response = await axios.post(url, data, requestDataFormUrlEncoded())
  return response
}

export async function admitPatient (idPatient) {
  const url = `${REQUEST_DIR}pacientes`
  const response = await axios.post(url, idPatient, requestDataFormUrlEncoded())
  return response
}
