<template>
  <div class="singe">
    歌手页
  </div>
</template>

<script>
  import singerService from '@/service/singer'

  export default {
    name: 'index',
    data () {
      return {
        singers: []
      }
    },
    async created () {
      this.singers = await singerService.list()

      console.log(this.singers)
    }
  }
</script>

<style lang="scss" scoped>

</style>
