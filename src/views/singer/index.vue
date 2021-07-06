<template>
  <div class="singer" v-loading="!singers.length">
    <m-index-list :groups="singers"></m-index-list>
  </div>
</template>

<script>
  import MIndexList from '@/components/index-list'
  import singerService from '@/service/singer'

  export default {
    name: 'index',
    components: {
      MIndexList
    },
    data () {
      return {
        singers: []
      }
    },
    async created () {
      const result = await singerService.list()

      this.singers = result.singers
    }
  }
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 20px;
  }
</style>
