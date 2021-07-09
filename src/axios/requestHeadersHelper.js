import { AGENT } from '@/utils/constants'
import store from '@/store'

export function requestData () {
  return {
    headers: {
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
      'Content-Type': 'application/x-www-form-urlencoded',
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
