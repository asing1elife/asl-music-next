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
 * 切换模式
 */
export function changeMode ({ commit, state, getters }, mode) {
  // 随机播放需要打乱顺序
  const playlist = mode === PLAY_MODE.random ? shuffle(state.sequences) : state.sequences
  // 获取当前歌曲
  const currentSongId = getters.currentSong.id
  // 获取当前歌曲在新列表中的索引，防止切换模式时当前歌曲发生变化
  const index = playlist.findIndex(song => song.id === currentSongId)

  commonPlay({
    commit,
    playlist,
    mode,
    index
  })
}

/**
 * 通用播放
 */
function commonPlay ({ commit, songs, playlist = songs, mode = PLAY_MODE.sequence, index = 0 }) {
  if (songs) {
    commit('setSequences', songs)
  }

  commit('setPlaylist', playlist)
  commit('setPlayMode', mode)
  commit('setCurrentIndex', index)
  commit('setPlaying', true)
  commit('setFullscreen', true)
}
