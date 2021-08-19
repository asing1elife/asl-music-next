import { computed } from 'vue'
import { useStore } from 'vuex'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode () {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)

  // 根据播放模式切换图标
  const modeCls = computed(() => {
    const baseCls = 'icon icon-'

    switch (playMode.value) {
      case PLAY_MODE.sequence:
        return baseCls + 'sequence'
      case PLAY_MODE.loop:
        return baseCls + 'loop'
      case PLAY_MODE.random:
        return baseCls + 'random'
      default:
        return baseCls
    }
  })

  // 切换播放模式
  const changeMode = async () => {
    // 播放模式取值范围 0 1 2
    const currentMode = (playMode.value + 1) % 3

    // 更新播放模式
    await store.dispatch('changeMode', currentMode)
  }

  return {
    modeCls,
    changeMode
  }
}
