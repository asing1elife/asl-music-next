<template>
  <div
    class="singer-detail"
  >
    <m-music-list
      :name="name"
      :pic="pic"
      :loading="loading"
      :songs="songs"
    ></m-music-list>
  </div>
</template>

<script>
  import MMusicList from '@/components/music-list'
  import singerService from '@/service/singer'
  import songService from '@/service/song'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/assets/js/constant'

  export default {
    name: 'singerDetail',
    components: {
      MMusicList
    },
    props: {
      mid: {
        type: String,
        default: ''
      },
      singer: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        loading: true,
        songs: []
      }
    },
    computed: {
      currentSinger () {
        // 尝试从父级获取歌手
        let singer = this.singer

        // 成功获取，直接返回
        if (singer) {
          return singer
        }

        // 尝试从缓存中获取歌手
        singer = storage.session.get(SINGER_KEY)

        // 成功获取，并且缓存中的歌手 ID 与请求链接中的保持一致
        if (singer && singer.mid === this.mid) {
          return singer
        }

        return undefined
      },
      name () {
        return this.currentSinger && this.currentSinger.name
      },
      pic () {
        return this.currentSinger && this.currentSinger.pic
      }
    },
    created () {
      // 没有获取到有效歌手信息
      if (!this.currentSinger) {
        // 返回一级路由链接
        this.$router.push({
          path: this.$route.matched[0].path
        })

        return
      }

      this._wrapSongsUrl()
    },
    methods: {
      async _wrapSongsUrl () {
        // 获取歌手详情
        const result = await singerService.detail(this.currentSinger.mid)

        // 获取歌曲列表，以及 URL
        this.songs = await songService.url(result.songs)

        this.loading = false
      }
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
