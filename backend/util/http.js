const axios = require('axios')
const config = require('./config')

/**
 * 封装 axios get 请求
 */
function get (url, params) {
  return axios.get(url, {
    // 伪造请求发送的来源地址
    headers: {
      referrer: config.BASE_URL,
      origin: config.BASE_URL
    },
    // 将传入的参数和公共参数合并
    params: Object.assign({}, config.commonParams, params)
  })
}

/**
 * 封装 axios post 请求
 */
function post (url, params) {
  return axios.post(url, params, {
    headers: {
      referrer: config.BASE_URL,
      origin: config.BASE_URL,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

module.exports = {
  get,
  post
}
