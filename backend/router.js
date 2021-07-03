const axios = require('axios')

const getSecuritySign = require('./sign')

const SUCCESS = 0
const FAIL = {
  10001: {
    code: 10001,
    data: '无法获取推荐页数据'
  }
}
const BASE_URL = 'https://y.qq.com'
const RECOMMEND_URL = 'https://u.y.qq.com/cgi-bin/musics.fcg'

// 公共参数
const commonParams = {
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  needNewCode: 0,
  format: 'json',
  platform: 'yqq.json'
}

/**
 * 获取随机数
 */
function getRandomVal (prefix = '') {
  return prefix + (Math.random() + '').replace('0', '')
}

/**
 * 获取随机 uid
 */
function getUid () {
  const t = (new Date()).getUTCMilliseconds()

  return '' + Math.round(2147483647 * Math.random()) * t % 1e10
}

/**
 * 封装 axios get 请求
 */
function get (url, params) {
  return axios.get(url, {
    // 伪造请求发送的来源地址
    headers: {
      referrer: BASE_URL,
      origin: BASE_URL
    },
    // 将传入的参数和公共参数合并
    params: Object.assign({}, commonParams, params)
  })
}

/**
 * 封装 axios post 请求
 */
function post (url, params) {
  return axios.post(url, params, {
    headers: {
      referrer: BASE_URL,
      origin: BASE_URL,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 注册后端路由
 */
function registerRouter (app) {
  // 推荐页
  registerRecommend(app)
}

/**
 * 注册推荐页接口路由
 */
function registerRecommend (app) {
  app.get('/api/recommend', (req, res) => {
    // 构造请求参数
    const data = JSON.stringify({
      comm: { ct: 24 },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: { async: 1, cmd: 2 },
        module: 'playlist.HotRecommendServer'
      },
      focus: { module: 'music.musicHall.MusicHallPlatform', method: 'GetFocus', param: {} }
    })

    // 随机数
    const randomVal = getRandomVal('recom')
    // 对请求参数进行签名
    const sign = getSecuritySign(data)

    // 发送请求
    get(RECOMMEND_URL, {
      sign,
      '-': randomVal,
      data
    }).then(response => {
      const result = response.data

      // 数据获取失败
      if (result.code !== SUCCESS) {
        res.json(FAIL['10001'])
        return
      }

      res.json({
        code: SUCCESS,
        data: {
          // 包赚推荐页轮播数据
          sliders: wrapRecommendCarousels(result),
          // 包装推荐页专辑数据
          albums: wrapRecommendAlbums(result)
        }
      })
    }).catch(err => {
      console.log(err)
    })
  })
}

/**
 * 包装推荐页专辑数据
 */
function wrapRecommendAlbums (data) {
  const originalData = data.recomPlaylist.data.v_hot
  const albums = []

  if (!originalData || originalData.length === 0) {
    return albums
  }

  for (let datum of originalData) {
    const album = {
      id: datum.content_id,
      username: datum.username,
      title: datum.title,
      pic: datum.cover
    }

    albums.push(album)
  }

  return albums
}

/**
 * 包装推荐页轮播数据
 */
function wrapRecommendCarousels (data) {
  const originalData = data.focus.data.shelf.v_niche[0].v_card
  const sliders = []

  if (!originalData || originalData.length === 0) {
    return sliders
  }

  // 根据原始数据的长度来判定，最多只获取 10 调数据
  const validLength = Math.min(originalData.length, 10)
  for (let i = 0; i < validLength; i++) {
    const datum = originalData[i]

    const slider = {
      id: datum.id,
      pic: datum.cover,
      link: handleSpecialLinkPrefix(datum)
    }

    sliders.push(slider)
  }

  return sliders
}

/**
 * 处理特殊的链接前缀
 */
function handleSpecialLinkPrefix ({ jumptype, subid, id }) {
  // 特殊的链接前缀
  const specialLinkPrefix = {
    10002: 'https://y.qq.com/n/yqq/album/',
    10014: 'https://y.qq.com/n/yqq/playlist/',
    10012: 'https://y.qq.com/n/yqq/mv/v/'
  }

  const currentPrefix = specialLinkPrefix[jumptype]
  if (currentPrefix) {
    return currentPrefix + (subid || id) + '.html'
  } else if (item.jumptype === 3001) {
    return id
  }

  return ''
}

module.exports = registerRouter
