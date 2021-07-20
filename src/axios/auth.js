import { REQUEST_DIR } from '@/utils/constants'
import { requestData, requestDataFormUrlEncoded } from './requestHeadersHelper'
import axios from 'axios'

export async function login (user, pass) {
    user = {
        email: user,
        password: pass,
     }
  const url = `${REQUEST_DIR}auth/login`
  const response = await axios.post(url, user, requestDataFormUrlEncoded())
  return response
}
