<template>
  <div
    class="singer-detail"
  >
    <m-music-list
      :singer="singer"
      :songs="songs"
    ></m-music-list>
  </div>
</template>

<script>
  import singerService from '@/service/singer'
  import songService from '@/service/song'
  import MMusicList from '@/components/music-list'

  export default {
    name: 'singerDetail',
    components: {
      MMusicList
    },
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
