const config = require('./../util/config')
const http = require('./../util/http')
const getSecuritySign = require('./../util/sign')

function registerSongUrl (app) {
  app.get('/api/song/url', (req, res) => {
    const mids = req.query.mids

    let midGroup = []
    if (mids.length > 100) {
      // 将歌曲列表的长度限制在 100 以内，因为第三方接口一次只允许查询100条数据
      // 如果超过 100 条，则进行分组查询
      const groupLength = Math.ceil(mids.length / 100)
      for (let i = 0; i < groupLength; i++) {
        midGroup.push(mids.slice(i * 100, 100 * (i + 1)))
      }
    } else {
      midGroup = [mids]
    }

    // 以歌曲的 mid 为 key ，存储歌曲的 URL
    const urlMap = {}

    // 包装多个请求
    const requests = midGroup.map(mid => {
      const data = {
        req_0: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: {
            guid: config.getUid(),
            songmid: mid,
            songtype: new Array(mid.length).fill(0),
            uin: '0',
            loginflag: 0,
            platform: '23',
            h5to: 'speed'
          }
        },
        comm: {
          g_tk: config.TOKEN,
          uin: '0',
          format: 'json',
          platform: 'h5'
        }
      }

      const randomKey = config.getRandomVal()
      const sign = getSecuritySign(JSON.stringify(data))
      const url = config.SONG_URL + `?_=${ randomKey }&sign=${ sign }`

      return http.post(url, data).then(response => {
        const result = response.data

        if (result.code === config.SUCCESS) {
          const midurlinfo = result.req_0.data.midurlinfo
          const sip = result.req_0.data.sip
          const domain = sip[sip.length - 1]

          midurlinfo.forEach(info => {
            urlMap[info.songmid] = domain + info.purl
          })
        }
      })
    })

    return Promise.all(requests).then(() => {
      res.json({
        code: config.SUCCESS,
        data: {
          map: urlMap
        }
      })
    })
  })
}

module.exports = registerSongUrl
