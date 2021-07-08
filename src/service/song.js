import { get } from './base'

class SongService {
  url (songs) {
    if (!songs.length) {
      return Promise.resolve(songs)
    }

    return get('/api/song/url', {
      // 将传入歌曲列表的 mid 转化为数组
      mids: songs.map(song => {
        return song.mid
      })
    }).then(res => {
      const map = res.map

      return songs.map(song => {
        // 从返回的 map 中获取对应歌曲的 url
        song.url = map[song.mid]
        return song
      }).filter(song => {
        // 过滤掉无效的 url
        return song.url && song.url.indexOf('vkey') > -1
      })
    })
  }
}

export default new SongService()
