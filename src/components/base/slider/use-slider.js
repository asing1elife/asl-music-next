/**
 * https://better-scroll.github.io/docs/zh-CN/guide/
 */
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnMounted, ref } from 'vue'

// 注册 BetterScroll 的 Slide 组件
BScroll.use(Slide)

export default function useSlider (wrapperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)

  // 注册组件
  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画。
      momentum: false,
      // 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
      bounce: false,
      // 决定是否派发 scroll 事件，对页面的性能有影响，尤其是在 useTransition 为 true 的模式下。
      // 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件
      probeType: 2,
      // 开启轮播，直接 true 表示使用默认配置
      // 参考 https://better-scroll.github.io/docs/zh-CN/plugins/slide.html#slide-%E9%80%89%E9%A1%B9%E5%AF%B9%E8%B1%A1
      slide: true
    })

    // 监听页面切换事件
    sliderVal.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })

  // 销毁组件
  onUnMounted(() => {
    slider.value.destroy()
  })

  return {
    slider,
    currentPageIndex
  }
}
