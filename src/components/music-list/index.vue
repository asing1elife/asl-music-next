<template>
  <div class="music-list">
    <div
      class="pic-wrapper"
      ref="picRef"
      :style="picWrapperStyle"
    >
      <div
        class="pic-filter"
        :style="picFilterStyle"
      ></div>
      <div class="header">
        <a
          href="javascript:"
          class="back-btn"
          @click="toBack"
        >
          <i class="icon icon-back"></i>
        </a>
        {{name}}
      </div>
      <a
        href="javascript:"
        class="play-btn"
      >
        <i class="icon icon-play"></i>
        随机播放全部
      </a>
    </div>
    <m-scroll
      class="song-wrapper"
      v-loading="loading"
      v-empty="empty"
      :style="songWrapperStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <m-song-list :songs="songs"></m-song-list>
      </div>
    </m-scroll>
  </div>
</template>

<script>
  import MScroll from '@/components/base/scroll'
  import MSongList from '@/components/base/song-list'
  import useScroll from './use-scroll'

  export default {
    name: 'm-music-list',
    components: {
      MScroll,
      MSongList
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      pic: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    /**
     * 这里计算属性没有挪到 setup 中编写
     * 是因为 songWrapperTop 需要 DOM 渲染之后动态获取，无法直接在 computed 中获取
     * 尝试在 computed 中使用 await nextTick ，并无法实现
     */
    computed: {
      empty () {
        return !this.loading && this.songs.length === 0
      },
      picWrapperStyle () {
        const scrollY = this.scrollY
        const songWrapperTop = this.songWrapperTop
        const topDistance = this.topDistance

        let paddingTop = '70%'
        let backgroundSize = 'cover'
        const backgroundImage = `url(${ this.pic })`

        if (scrollY > 0) {
          // 计算放大比例
          const zoomScale = scrollY / songWrapperTop * 100 + 100

          // 背景图的可视区域跟随列表向下拉动时，一起变大
          paddingTop = `${ topDistance }px`
          // 列表向下拉动时，背景图变大
          backgroundSize = `${ zoomScale }%`
        }

        return {
          backgroundImage,
          backgroundSize,
          paddingTop
        }
      },
      songWrapperStyle () {
        const songWrapperTop = this.songWrapperTop
        const topDistance = this.topDistance
        const HEADER_HEIGHT = 42

        let top
        let overflow

        if (topDistance === 0 || topDistance > HEADER_HEIGHT) {
          // 如果列表到顶部的距离大于顶栏，则允许列表溢出滚动区域
          top = `${ songWrapperTop }px`
          overflow = 'visible'
        } else {
          // 否则将滚动区域到顶部的距离写死，并限制列表不能溢出滚动区域
          top = `${ HEADER_HEIGHT }px`
          overflow = 'hidden'
        }

        return {
          top,
          overflow
        }
      },
      picFilterStyle () {
        const scrollY = this.scrollY

        let backdropFilter = 'blur(0)'

        if (scrollY < 0) {
          // 根据向上滚动距离的绝对值来计算模糊比例
          // 但模糊比例的最大值不能大于 10
          const blurScale = Math.min(10, Math.abs(scrollY) * 0.1)

          backdropFilter = `blur(${ blurScale }px)`
        }

        return {
          backdropFilter
        }
      }
    },
    methods: {
      toBack () {
        this.$router.back()
      }
    },
    setup () {
      const { picRef, scrollY, songWrapperTop, topDistance, onScroll } = useScroll()

      return {
        picRef,
        scrollY,
        songWrapperTop,
        topDistance,
        onScroll
      }
    }
  }
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;

    .pic-wrapper {
      position: relative;
      top: 0;
      width: 100%;
      padding-top: 70%;
      background-size: cover;
      background-position: top center;

      .pic-filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .4);
        z-index: 1;
      }

      .header {
        position: absolute;
        top: 0;
        width: calc(100% - 20px);
        height: 22px;
        line-height: 22px;
        text-align: center;
        padding: 10px;
        font-size: $font-size-large;
        z-index: 2;

        .back-btn {
          position: absolute;
          left: 10px;

          .icon {
            font-size: $font-size-large-x;
            color: $color-theme;
          }
        }
      }

      .play-btn {
        position: absolute;
        z-index: 2;
        left: 50%;
        bottom: 20px;
        transform: translate3d(-50%, 0, 0);
        border: 1px solid $color-theme;
        padding: 10px 20px;
        border-radius: 20px;
        color: $color-theme;
        font-size: $font-size-medium;
      }
    }

    .song-wrapper {
      width: 100%;
      position: absolute;
      bottom: 0;
      z-index: 2;

      .song-list-wrapper {
        background-color: $color-background;
        padding: 30px 30px 10px 30px;
      }
    }
  }
</style>
