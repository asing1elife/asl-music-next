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
  import songService from '@/service/song'

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
      // 获取歌手详情
      const result = await singerService.detail(this.singer.mid)

      // 获取歌曲列表，以及 URL
      this.songs = await songService.url(result.songs)

      console.log(this.songs)
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
