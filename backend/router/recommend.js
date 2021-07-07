const config = require('./../util/config')
const http = require('./../util/http')
const getSecuritySign = require('./../util/sign')

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
    const randomVal = config.getRandomVal('recom')
    // 对请求参数进行签名
    const sign = getSecuritySign(data)

    // 发送请求
    http.get(config.RECOMMEND_URL, {
      sign,
      '-': randomVal,
      data
    }).then(response => {
      const result = response.data

      // 数据获取失败
      if (result.code !== config.SUCCESS) {
        res.json(config.FAIL['10001'])
        return
      }

      res.json({
        code: config.SUCCESS,
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
  } else if (jumptype === 3001) {
    return id
  }

  return ''
}

module.exports = registerRecommend
