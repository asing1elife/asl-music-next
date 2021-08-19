import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useControl (audioRef, songReady) {
  const store = useStore()
  const playing = computed(() => store.state.playing)
  const currentIndex = computed(() => store.state.currentIndex)
  const playlist = computed(() => store.state.playlist)
  const fullscreen = computed(() => store.state.fullscreen)

  // 最后一首歌的索引
  const lastIndex = computed(() => {
    return playlist.value.length - 1
  })

  // 根据播放状态，切换按钮样式
  const playBtnCls = computed(() => {
    const status = playing.value ? 'pause' : 'play'

    return `icon icon-${ status }`
  })

  // 关闭播放器
  const closePlayer = () => {
    store.commit('setFullscreen', false)
  }

  // 切换播放状态
  const togglePlay = () => {
    if (!songReady.value) {
      return
    }

    const playingVal = playing.value

    const audioEl = audioRef.value
    playingVal ? audioEl.pause() : audioEl.play()

    store.commit('setPlaying', !playingVal)
  }

  // 上一首
  const prev = () => {
    if (!songReady.value) {
      return
    }

    let index = currentIndex.value - 1

    // 如果索引为负值，则切换到当前歌曲列表的最后一首
    if (index < 0) {
      index = lastIndex.value
    }

    store.commit('setCurrentIndex', index)
  }

  // 下一首
  const next = () => {
    if (!songReady.value) {
      return
    }

    let index = currentIndex.value + 1

    // 已经到最后一首歌，则切换到第一首
    if (index > lastIndex.value) {
      index = 0
    }

    store.commit('setCurrentIndex', index)
  }

  return {
    fullscreen,
    playBtnCls,
    closePlayer,
    togglePlay,
    prev,
    next
  }
}
