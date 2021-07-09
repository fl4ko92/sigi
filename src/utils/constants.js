import https from 'https'
export const SERVER_DIR = 'https://sigi.uclv.cu'
export const API_NAME = '/api/'
export const REQUEST_DIR = SERVER_DIR + API_NAME
export const AGENT = new https.Agent({
  rejectUnauthorized: false,
})
