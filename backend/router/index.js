const registerRecommend = require('./recommend')
const { registerSinger, registerSingerDetail } = require('./singer')
const registerSongUrl = require('./song')

/**
 * 注册后端路由
 */
function registerRouter (app) {
  // 推荐页
  registerRecommend(app)
  // 歌手页
  registerSinger(app)
  // 歌手详情页
  registerSingerDetail(app)
  // 歌曲 URL
  registerSongUrl(app)
}

module.exports = registerRouter
