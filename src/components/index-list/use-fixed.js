import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed (props) {
  const FIXED_LABEL_HEIGHT = 30
  const LAST_GROUP_ITEM_MARGIN = 20

  // 列表对象
  const groupRef = ref(null)
  // Y轴偏移量
  const scrollY = ref(0)
  // 当前列表的索引
  const currentIndex = ref(0)
  // 下一列表到顶栏的距离
  const topDistance = ref(0)
  // 列表高度数组
  const groupHeights = ref([])

  // 根据获取到的索引，计算应该显示的标签
  const fixedLabel = computed(() => {
    // 当列表向下拉出空白时，直接返回空值
    if (scrollY.value < 0) {
      return ''
    }

    // 获取与当前索引匹配的标签
    const group = props.groups[currentIndex.value]

    return !group ? '' : group.title
  })

  // 根据下一个列表到顶部的距离计算顶栏位移的距离
  const fixedStyle = computed(() => {
    // 如果距离顶部大于 0 ，且小于 30 ，则说明下一列表的顶部已经触碰到顶栏，这个时候就需要根据位移距离触发动画
    const offset = (topDistance.value > 0 && topDistance.value < FIXED_LABEL_HEIGHT) ? topDistance.value - FIXED_LABEL_HEIGHT : 0

    return `transform: translate3d(0, ${ offset }px, 0)`
  })

  // 当列表数据被传入后，获取到所有列表的高度
  watch(() => props.groups, async () => {
    // 当 DOM 元素渲染之后
    await nextTick()

    // 重置分组高度数组
    groupHeights.value = [0]
    // 当前总高度
    let height = 0

    // 获取分组的所有元素
    const children = groupRef.value.children
    // 遍历元素并将获取到的高度追加到数组中
    children.forEach(child => {
      // 高度逐步累加，因为每个具体元素都存在 margin-bottom:20px ，所以最后添加时需要追加 20 的偏移量
      height += child.clientHeight + LAST_GROUP_ITEM_MARGIN

      groupHeights.value.push(height)
    })
  })

  function onScroll (pos) {
    // 获取列表滚动时 Y 轴的偏移量，因为返回的是负值，所以需要负负得正
    scrollY.value = -pos.y

    const groupHeightsVal = groupHeights.value
    const currentScrollY = scrollY.value
    // 因为高度数据中默认就存在一个 0 元素，所以这里长度需要减一
    for (let i = 0; i < groupHeightsVal.length - 1; i++) {
      // 当前列表的高度
      const currentHeight = groupHeightsVal[i]
      // 下一列表的高度
      const nextHeight = groupHeightsVal[i + 1]

      // 当偏移量位于两者之间，说明正处于当前列表
      if (currentScrollY >= currentHeight && currentScrollY < nextHeight) {
        // 记录当前列表索引
        currentIndex.value = i

        // 记录下一列表到顶部的距离
        topDistance.value = nextHeight - currentScrollY
      }
    }
  }

  return {
    groupRef,
    fixedLabel,
    fixedStyle,
    onScroll
  }
}
