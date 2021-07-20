import { AGENT } from '@/utils/constants'
import { decrypt } from '../utils/enc'

export function requestData () {
  return {
    headers: {
      Authorization: 'Bearer ' + decrypt(localStorage.getItem('tkn')),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    httpsAgent: {
      AGENT,
    },
  }
}

export function requestDataFormUrlEncoded () {
  return {
    headers: {
      Authorization: 'Bearer ' + decrypt(localStorage.getItem('tkn')),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    httpsAgent: {
      AGENT,
    },
  }
}

export function requestDataMultipartForm () {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    httpsAgent: {
      AGENT,
    },
  }
}
