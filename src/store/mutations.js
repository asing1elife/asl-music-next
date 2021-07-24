const mutations = {
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  setPlaying (state, playing) {
    state.playing = playing
  },
  setFullscreen (state, fullscreen) {
    state.fullscreen = fullscreen
  },
  setPlaylist (state, playlist) {
    state.playlist = playlist
  },
  setSequences (state, sequences) {
    state.sequences = sequences
  }
}

export default mutations
