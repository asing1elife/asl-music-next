const registerRecommend = require('./recommend')
const { registerSinger, registerSingerDetail } = require('./singer')

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
}

module.exports = registerRouter
