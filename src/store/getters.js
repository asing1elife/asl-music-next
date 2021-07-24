// 获取当前歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
