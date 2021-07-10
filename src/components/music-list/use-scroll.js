import { onMounted, ref } from 'vue'

export default function useScroll () {
  const picRef = ref(null)
  const songWrapperTop = ref(0)
  const scrollY = ref(0)
  const topDistance = ref(0)

  onMounted(() => {
    songWrapperTop.value = picRef.value.clientHeight
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
    scrollY,
    songWrapperTop,
    topDistance,
    onScroll
  }
}
