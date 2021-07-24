<template>
  <m-header></m-header>
  <m-tab></m-tab>
  <router-view></router-view>
  <m-player></m-player>
</template>

<script>
  import MHeader from '@/components/header'
  import MTab from '@/components/tab'
  import MPlayer from '@/components/player'

  export default {
    name: 'app',
    components: {
      MHeader,
      MTab,
      MPlayer
    }
  }
</script>

<style lang="scss">
</style>
