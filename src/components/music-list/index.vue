<template>
  <div class="music-list">
    <div
      class="pic-wrapper"
      ref="picRef"
      :style="picWrapperStyle"
    >
      <div class="pic-filter"></div>
      <div class="header">
        <a
          href="javascript:"
          class="back-btn"
          @click="toBack"
        >
          <i class="icon icon-back"></i>
        </a>
        {{singer.name}}
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
      v-loading="!songs.length"
      :style="songWrapperStyle"
    >
      <div class="song-list-wrapper">
        <div
          class="song-item"
          v-for="song in songs"
          :key="song.id"
        >
          <p class="title">{{song.name}}</p>
          <p class="desc">{{song.singer}} - {{song.album}}</p>
        </div>
      </div>
    </m-scroll>
  </div>
</template>

<script>
  import MScroll from '@/components/base/scroll'

  export default {
    name: 'm-music-list',
    components: {
      MScroll
    },
    props: {
      singer: {
        type: Object,
        default: () => {}
      },
      songs: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        picWrapperHeight: '0'
      }
    },
    computed: {
      picWrapperStyle () {
        return `background-image: url(${ this.singer && this.singer.pic })`
      },
      songWrapperStyle () {
        return `top: ${ this.picWrapperHeight }px`
      }
    },
    mounted () {
      this.picWrapperHeight = this.$refs.picRef.clientHeight
    },
    methods: {
      toBack () {
        this.$router.back()
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
      overflow: hidden;
      position: absolute;
      bottom: 0;

      .song-list-wrapper {
        padding: 30px 30px 10px 30px;

        .song-item {
          margin-bottom: 20px;

          .desc {
            color: $color-text-d;
            margin-top: 10px;
            font-size: $font-size-medium;
          }
        }
      }
    }
  }
</style>
