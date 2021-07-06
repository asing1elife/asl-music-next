import { ref, computed } from 'vue'

export default function useShortcut (props, groupRef) {
  // 标签的高度
  const LABEL_HEIGHT = 21

  // BScroll 实例
  const scrollRef = ref(null)
  // 记录触摸动作
  const touch = {}

  // 获取列表中的标签
  const labels = computed(() => {
    return props.groups.map(group => {
      return group.title
    })
  })

  // 监听触摸开始时的动作
  function onTouchStart (e) {
    // 记录触摸开始时的 y 值
    touch.start = e.touches[0].pageY
    // 获取并记录当前被点击标签的索引
    touch.currentIndex = parseInt(e.target.dataset.index)

    scrollTo(touch.currentIndex)
  }

  // 监听触摸持续移动时的动作
  function onTouchMove (e) {
    // 记录触摸移动时的 y 值
    touch.end = e.touches[0].pageY
    // 计算出位移了多少个标签距离，也就获得了当前位移标签的索引
    const delta = (touch.end - touch.start) / LABEL_HEIGHT | 0
    // 确认当前索引时，需要加上触摸开始时记录的索引，否则如果触摸到中间突然停止，再次触摸时，所以会先回到0
    const currentIndex = touch.currentIndex + delta

    scrollTo(currentIndex)
  }

  function scrollTo (index) {
    // 获取当前被点击标签索引对应的列表
    const currentEl = groupRef.value.children[index]

    // 过滤无效触摸
    if (!currentEl) {
      return
    }

    // 跳转到指定列表
    scrollRef.value.scroll.scrollToElement(currentEl, 0)
  }

  return {
    scrollRef,
    labels,
    onTouchStart,
    onTouchMove
  }
}
