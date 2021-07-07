module.exports = {
  SUCCESS: 0,
  FAIL: {
    10001: {
      code: 10001,
      data: '无法获取推荐页数据'
    }
  },

  BASE_URL: 'https://y.qq.com',
  RECOMMEND_URL: 'https://u.y.qq.com/cgi-bin/musics.fcg',
  SINGER_URL: 'https://u.y.qq.com/cgi-bin/musics.fcg',

  // 专辑图片加载失败的默认显示
  FALLBACK_PIC_URL: 'https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000',

  // 公共参数
  commonParams: {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    needNewCode: 0,
    format: 'json',
    platform: 'yqq.json'
  },

  /**
   * 获取随机数
   */
  getRandomVal: function (prefix = '') {
    return prefix + (Math.random() + '').replace('0', '')
  },

  /**
   * 获取随机 uid
   */
  getUid: function () {
    const t = (new Date()).getUTCMilliseconds()

    return '' + Math.round(2147483647 * Math.random()) * t % 1e10
  }

}
