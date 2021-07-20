export default class Models {
  static async login (axios, username, password) {
    const FormData = require('form-data')
    const data = new FormData()
    data.append('name', username)
    data.append('password', password)
    const response = await axios.post('/auth/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.status === 200) {
      return response.data
    } else if (response.status === 403) {
      return -1
    }
  }
}
