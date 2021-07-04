import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

import { ref, onMounted, onUnmounted } from 'vue'

// 注册 DOM 监听组件
// https://better-scroll.github.io/docs/zh-CN/plugins/observe-dom.html
BScroll.use(ObserveDOM)

export default function useScroll (wrapperRef, options) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      // 开启 DOM 监听
      observeDOM: true,
      ...options
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}
