const pinyin = require('pinyin')

const config = require('./../util/config')
const http = require('./../util/http')
const getSecuritySign = require('./../util/sign')

/**
 * 注册歌手页接口路由
 */
function registerSinger (app) {
  app.get('/api/singer', (req, res) => {
    const data = JSON.stringify({
      comm: { ct: 24, cv: 0 },
      singerList: {
        module: 'Music.SingerListServer',
        method: 'get_singer_list',
        param: { area: -100, sex: -100, genre: -100, index: -100, sin: 0, cur_page: 1 }
      }
    })

    const randomKey = config.getRandomVal('getUCGI')
    const sign = getSecuritySign(data)

    http.get(config.SINGER_URL, {
      sign,
      '-': randomKey,
      data
    }).then(response => {
      const result = response.data

      if (result.code !== config.SUCCESS) {
        res.json(config.FAIL['10001'])
        return
      }

      res.json({
        code: config.SUCCESS,
        data: {
          singers: wrapSingers(result)
        }
      })
    }).catch(err => {
      console.log(err)
    })
  })
}

/**
 * 注册歌手详情页接口路由
 */
function registerSingerDetail (app) {
  app.get('/api/singer/detail', (req, res) => {
    const data = JSON.stringify({
      comm: { ct: 24, cv: 0 },
      singerSongList: {
        method: 'GetSingerSongList',
        // req.query.mid 由前端传入
        param: { order: 1, singerMid: req.query.mid, begin: 0, num: 100 },
        module: 'musichall.song_list_server'
      }
    })

    const randomKey = config.getRandomVal('getSingerSong')
    const sign = getSecuritySign(data)

    http.get(config.SINGER_URL, {
      sign,
      '-': randomKey,
      data
    }).then(response => {
      const result = response.data

      if (result.code !== config.SUCCESS) {
        res.josn(config.FAIL['10001'])
        return
      }

      res.json({
        code: config.SUCCESS,
        data: {
          songs: wrapSongs(result)
        }
      })
    }).catch(err => {
      console.log(err)
    })
  })
}

/**
 * 包装歌曲数据
 */
function wrapSongs (data) {
  const originalSongs = data.singerSongList.data.songList
  const songs = []

  originalSongs.forEach(original => {
    const info = original.songInfo || original

    // 过滤付费歌曲和获取不到时长的歌曲
    if (info.pay.pay_play !== 0 || !info.interval) {
      return
    }

    const song = {
      id: info.id,
      mid: info.mid,
      name: info.name,
      singer: mergeSinger(info.singer),
      url: '', // 在另一个接口获取
      duration: info.interval,
      pic: info.album.mid ? `https://y.gtimg.cn/music/photo_new/T002R800x800M000${ info.album.mid }.jpg?max_age=2592000` : config.FALLBACK_PIC_URL,
      album: info.album.name
    }

    songs.push(song)
  })

  return songs
}

/**
 * 合并多个歌手姓名
 */
function mergeSinger (singer) {
  const ret = []

  if (!singer) {
    return ''
  }

  singer.forEach(s => {
    ret.push(s.name)
  })

  return ret.join('/')
}

/**
 * 包装歌手数据
 */
function wrapSingers (data) {
  const singers = data.singerList.data.singerlist

  const hotName = '热'
  const singerMap = {
    hot: {
      title: hotName,
      // 只拿前10条数据
      list: handleSingerMap(singers.slice(0, 10))
    }
  }

  singers.forEach(singer => {
    // 把歌手名称转化为拼音
    const pinyinName = pinyin(singer.singer_name)
    if (!pinyinName || !pinyinName.length) {
      return
    }

    // 获取第一个拼音的第一个字母，并且大写
    const key = pinyinName[0][0].slice(0, 1).toUpperCase()
    if (!key) {
      return
    }

    // 判断该字母是否存在与map中
    if (!singerMap[key]) {
      // 不存在则添加
      singerMap[key] = {
        title: key,
        list: []
      }
    }

    // 将当前歌手数据包装成数组后，进行格式处理，返回后的数据由于是数组，需要获取第0个
    const pureSinger = handleSingerMap([singer])[0]
    // 将对应首字母的歌手添加到对应的列表中
    singerMap[key].list.push(pureSinger)
  })

  const hot = []
  const letter = []

  // 数据排序，map过滤的数据不一定有序
  for (let key in singerMap) {
    const singer = singerMap[key]
    const title = singer.title

    if (title.match(/[a-zA-Z]/)) {
      letter.push(singer)
    } else if (title === hotName) {
      hot.push(singer)
    }
  }

  // 按字母顺序排序
  letter.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })

  return hot.concat(letter)
}

/**
 * 过滤有效数据
 */
function handleSingerMap (singers) {
  return singers.map(singer => {
    return {
      id: singer.singer_id,
      mid: singer.singer_mid,
      name: singer.singer_name,
      pic: singer.singer_pic.replace(/\.webp$/, '.jpg').replace('150x150', '800x800')
    }
  })
}

module.exports = {
  registerSinger,
  registerSingerDetail
}
