export default class User {
  static async login (axios, username, password) {
    const response = await axios.post(
      '/auth/login/',
      `{
        "name":"${username}",
        "password": "${password}"
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data.auth_token
  }

  static async logout (axios) {
    const response = await axios.post('/auth/logout/', '{}', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  }
}
