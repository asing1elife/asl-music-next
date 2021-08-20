import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/storage'
import { LIKE_KEY } from '@/assets/js/constant'

export default function useLike (song) {
  const store = useStore()
  const likes = computed(() => store.state.likes)

  /**
   * 收藏按钮样式
   */
  const likeBtnCls = computed(() => {
    const baseCls = 'icon icon-like'

    if (isLike()) {
      return baseCls
    }

    return baseCls + '-o'
  })

  /**
   * 是否已收藏
   */
  const isLike = () => {
    return !!likes.value.find(like => like.id === song.value.id)
  }

  /**
   * 切换收藏状态
   */
  const toggleLike = () => {
    let currentLikes

    if (isLike()) {
      // 已收藏，则删除
      currentLikes = remove(LIKE_KEY, compare)
    } else {
      // 未收藏，则添加
      currentLikes = save(LIKE_KEY, song.value, compare)
    }

    store.commit('setLikes', currentLikes)
  }

  const compare = (item) => {
    return item.id === song.value.id
  }

  return {
    likeBtnCls,
    toggleLike
  }
}
