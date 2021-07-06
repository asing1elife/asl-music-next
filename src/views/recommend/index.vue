<template>
  <div
    class="recommend"
    v-loading:[tip]="loading"
  >
    <m-scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <m-slider
              v-if="sliders.length"
              :sliders="sliders"
            ></m-slider>
          </div>
        </div>
        <div class="album-wrapper">
          <p class="album-title">热门歌单推荐</p>
          <div class="album-content">
            <div
              class="album-item"
              v-for="album in albums"
              :key="album.id"
            >
              <img v-lazy="album.pic">
              <div class="info">
                <p class="username">{{album.username}}</p>
                <p class="title">{{album.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m-scroll>
  </div>
</template>

<script>
  import recommendService from '@/service/recommend'
  import MSlider from '@/components/base/slider'
  import MScroll from '@/components/base/scroll'

  export default {
    name: 'recommend',
    components: {
      MSlider,
      MScroll
    },
    data () {
      return {
        tip: '正在加载推荐数据',
        sliders: [],
        albums: []
      }
    },
    computed: {
      loading () {
        return !this.sliders.length && !this.albums.length
      }
    },
    async created () {
      await this._findRecommends()
    },
    methods: {
      async _findRecommends () {
        const recommends = await recommendService.list()

        this.sliders = recommends.sliders
        this.albums = recommends.albums
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 20px;

    .recommend-content {
      height: 100%;
      overflow: hidden;

      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;

        .slider-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      .album-wrapper {
        .album-title {
          margin: 30px 0;
          font-size: $font-size-large;
          color: $color-theme;
          text-align: center;
        }

        .album-item {
          display: flex;
          margin: 0 20px 20px 20px;

          img {
            width: 70px;
            height: 70px;
            overflow: hidden;
          }

          .info {
            margin-left: 20px;
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
</style>
