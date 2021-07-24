import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

/**
 * 选择歌曲
 */
export function selectSong ({ commit }, { songs, index }) {
  commonPlay({
    commit,
    songs,
    index
  })
}

/**
 * 随机播放
 */
export function randomPlay ({ commit }, songs) {
  // 洗牌
  const randomSongs = shuffle(songs)

  commonPlay({
    commit,
    songs,
    playlist: randomSongs,
    mode: PLAY_MODE.random
  })
}

/**
 * 通用播放
 */
function commonPlay ({ commit, songs, playlist = songs, mode = PLAY_MODE.sequence, index = 0 }) {
  commit('setSequences', songs)
  commit('setPlaylist', playlist)
  commit('setPlayMode', mode)
  commit('setCurrentIndex', index)
  commit('setPlaying', true)
  commit('setFullscreen', true)
}
