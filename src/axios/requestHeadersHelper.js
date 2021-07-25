import { AGENT } from '@/utils/constants'

export function requestData (filters) {
  return {
    params: filters,
    headers: {
      // Authorization: 'Bearer ' + decrypt(localStorage.getItem('tkn')),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    httpsAgent: {
      AGENT,
    },
  }
}

export function requestDataFormUrlEncoded (filters) {
  return {
    params: filters,
    headers: {
      // Authorization: 'Bearer ' + decrypt(localStorage.getItem('tkn')),
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
