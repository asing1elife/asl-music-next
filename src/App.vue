<template>
  <m-header></m-header>
  <m-tab></m-tab>
  <router-view></router-view>
</template>

<script>
  import MHeader from '@/components/header'
  import MTab from '@/components/tab'

  export default {
    name: 'app',
    components: {
      MHeader,
      MTab
    }
  }
</script>

<style lang="scss">
</style>
