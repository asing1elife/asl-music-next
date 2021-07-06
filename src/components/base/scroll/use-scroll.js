import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

import { ref, onMounted, onUnmounted } from 'vue'

// 注册 DOM 监听组件
// https://better-scroll.github.io/docs/zh-CN/plugins/observe-dom.html
BScroll.use(ObserveDOM)

export default function useScroll (wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      // 开启 DOM 监听
      observeDOM: true,
      ...options
    })

    if (options.probeType > 0) {
      scroll.value.on('scroll', pos => {
        // 监听滚动，并将当前的偏移量派发到 scroll 事件
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  // 对外暴露 BScroll 实例
  return scroll
}
