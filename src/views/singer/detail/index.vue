<template>
  <div
    class="singer-detail"
    v-loading="!songs.length"
  >
    歌手详情
  </div>
</template>

<script>
  import singerService from '@/service/singer'

  export default {
    name: 'singerDetail',
    props: {
      singer: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        songs: []
      }
    },
    async created () {
      const result = await singerService.detail(this.singer.mid)

      this.songs = result.songs
      console.log(result)
    }
  }
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $color-background;
  }
</style>
