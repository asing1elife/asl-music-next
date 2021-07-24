import { PLAY_MODE } from '@/assets/js/constant'

/**
 * 选择歌曲
 */
export function selectSong ({ commit }, { songs, index }) {
  commit('setPlaying', true)
  commit('setFullscreen', true)
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setCurrentIndex', index)
  commit('setPlaylist', songs)
  commit('setSequences', songs)
}
