const axios = require('axios')

const SUCCESS = 0
const BASE_URL = '/'

axios.defaults.baseURL = BASE_URL

export function get (url, params) {
  return axios.get(url, {
    params
  }).then(res => {
    const result = res.data

    if (result.code !== SUCCESS) {
      console.log('请求失败 -> ', result)
    }

    return result.data
  }).catch(err => {
    console.log(err)
  })
}
