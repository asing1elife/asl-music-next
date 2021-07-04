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
      }
    },
    setup (props) {
      const rootRef = ref(null)

      useScroll(rootRef, {
        click: props.click
      })

      return {
        rootRef
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
