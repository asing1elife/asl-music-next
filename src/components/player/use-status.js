import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default function useStatus (audioRef, songReady) {
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  // 根据歌曲状态，控制按钮的禁用样式
  const disableCls = computed(() => {
    return songReady.value ? '' : 'disabled'
  })

  // 监听歌曲变化
  watch(currentSong, (val) => {
    if (!val.url || !val.pic) {
      return
    }

    // 重置歌曲状态
    songReady.value = false

    // 更新播放地址
    const audioEl = audioRef.value
    audioEl.setAttribute('src', val.url)

    // 自动播放
    store.commit('setPlaying', true)
  })

  // 监听歌曲状态
  const readyHandler = () => {
    if (songReady.value) {
      return
    }

    songReady.value = true
  }

  // 监听错误状态
  const errorHandler = () => {
    // 当播放器加载错误时，直接更新歌曲状态，防止假死
    songReady.value = true
  }

  return {
    currentSong,
    disableCls,
    readyHandler,
    errorHandler
  }
}
