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
        @click="random"
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
        <m-song-list
          :songs="songs"
          @select="select"
        ></m-song-list>
      </div>
    </m-scroll>
  </div>
</template>

<script>
  import MScroll from '@/components/base/scroll'
  import MSongList from '@/components/base/song-list'
  import useScroll from './use-scroll'
  import { mapActions } from 'vuex'

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
    computed: {
      empty () {
        return !this.loading && this.songs.length === 0
      }
    },
    methods: {
      ...mapActions([
        'selectSong',
        'randomPlay'
      ]),
      toBack () {
        this.$router.back()
      },
      select ({ index }) {
        this.selectSong({
          songs: this.songs,
          index
        })
      },
      random () {
        this.randomPlay(this.songs)
      }
    },
    setup (props) {
      const { picRef, picWrapperStyle, songWrapperStyle, picFilterStyle, onScroll } = useScroll(props)

      return {
        picRef,
        picWrapperStyle,
        songWrapperStyle,
        picFilterStyle,
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
        background-color: $color-background-d;
        z-index: 1;
      }

      .header {
        position: absolute;
        top: 0;
        width: calc(100% - 20px);
        height: 22px;
        padding: 10px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-large;
        z-index: 2;

        .back-btn {
          position: absolute;
          left: 10px;
          top: 5px;

          .icon {
            font-size: $icon-size-s;
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
        padding: 5px 20px;
        display: flex;
        align-items: center;
        border-radius: 20px;
        color: $color-theme;
        font-size: $font-size-medium;

        .icon {
          font-size: $icon-size-s;
        }
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
