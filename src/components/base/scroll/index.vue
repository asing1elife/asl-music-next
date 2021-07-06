<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScroll from '@/components/base/scroll/use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'index',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      }
    },
    // 支持派发的事件
    emits: ['scroll'],
    setup (props, { emit }) {
      const rootRef = ref(null)

      useScroll(rootRef, {
        click: props.click,
        probeType: props.probeType
      }, emit)

      return {
        rootRef
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
