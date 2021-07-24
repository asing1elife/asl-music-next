import { onMounted, ref, computed } from 'vue'

export default function useScroll (props) {
  const picRef = ref(null)
  const songWrapperTop = ref(0)
  const scrollY = ref(0)
  const topDistance = ref(0)

  onMounted(() => {
    // 组件加载时，获取背景图的有效高度
    songWrapperTop.value = picRef.value.clientHeight
  })

  // 背景图样式
  const picWrapperStyle = computed(() => {
    const scrollYVal = scrollY.value
    const songWrapperTopVal = songWrapperTop.value
    const topDistanceVal = topDistance.value

    let paddingTop = '70%'
    let backgroundSize = 'cover'
    const backgroundImage = `url(${ props.pic })`

    if (scrollYVal > 0) {
      // 计算放大比例
      const zoomScale = scrollYVal / songWrapperTopVal * 100 + 100

      // 背景图的可视区域跟随列表向下拉动时，一起变大
      paddingTop = `${ topDistanceVal }px`
      // 列表向下拉动时，背景图变大
      backgroundSize = `${ zoomScale }%`
    }

    return {
      backgroundImage,
      backgroundSize,
      paddingTop
    }
  })

  // 歌曲列表样式
  const songWrapperStyle = computed(() => {
    const songWrapperTopVal = songWrapperTop.value
    const topDistanceVal = topDistance.value
    const HEADER_HEIGHT = 42

    let top
    let overflow

    if (topDistanceVal === 0 || topDistanceVal > HEADER_HEIGHT) {
      // 如果列表到顶部的距离大于顶栏，则允许列表溢出滚动区域
      top = `${ songWrapperTopVal }px`
      overflow = 'visible'
    } else {
      // 否则将滚动区域到顶部的距离写死，并限制列表不能溢出滚动区域
      top = `${ HEADER_HEIGHT }px`
      overflow = 'hidden'
    }

    return {
      top,
      overflow
    }
  })

  // 背景模糊样式
  const picFilterStyle = computed(() => {
    const scrollYVal = scrollY.value

    let backdropFilter = 'blur(0)'

    if (scrollYVal < 0) {
      // 根据向上滚动距离的绝对值来计算模糊比例
      // 但模糊比例的最大值不能大于 10
      const blurScale = Math.min(10, Math.abs(scrollYVal) * 0.1)

      backdropFilter = `blur(${ blurScale }px)`
    }

    return {
      backdropFilter
    }
  })

  /**
   * 监听列表滚动
   */
  function onScroll (pos) {
    scrollY.value = pos.y
    topDistance.value = songWrapperTop.value + pos.y
  }

  return {
    picRef,
    picWrapperStyle,
    songWrapperStyle,
    picFilterStyle,
    onScroll
  }
}
