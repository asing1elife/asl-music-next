<template>
  <div class="player-wrapper">
    <transition name="player">
      <div
        class="normal-player"
        v-show="fullscreen"
        :style="{backgroundImage: `url(${currentSong.pic})`}"
      >
        <div class="bg-filter"></div>
        <div class="header">
          <a
            href="javascript:"
            class="fullscreen-btn"
            @click="closePlayer"
          >
            <i class="icon icon-down"></i>
          </a>
          {{currentSong.name}}
        </div>
        <div class="body">
          <div class="singer-name">{{currentSong.singer}}</div>
          <div class="cover-page"></div>
        </div>
        <div class="footer">
          <div class="progress">
            <div class="begin-time">00:00</div>
            <div class="timeline">
              <div class="pointer"></div>
            </div>
            <div class="end-item">05:00</div>
          </div>
          <div class="operate">
            <div class="play-mode">
              <a
                href="javascript:"
                class="btn"
              >
                <i class="icon icon-loop"></i>
              </a>
            </div>
            <div class="play-state">
              <a
                href="javascript:"
                class="btn"
              >
                <i class="icon icon-previous"></i>
              </a>
              <a
                href="javascript:"
                class="btn play-btn"
              >
                <i class="icon icon-play"></i>
              </a>
              <a
                href="javascript:"
                class="btn"
              >
                <i class="icon icon-next"></i>
              </a>
            </div>
            <div class="play-extra">
              <a
                href="javascript:"
                class="btn"
              >
                <i class="icon icon-like-o"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio
      autoplay
      ref="audioRef"
    ></audio>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, watch, ref } from 'vue'

  export default {
    name: 'm-player',
    setup () {
      const store = useStore()
      const audioRef = ref(null)

      const fullscreen = computed(() => store.state.fullscreen)
      const currentSong = computed(() => store.getters.currentSong)

      // 关闭播放器
      const closePlayer = () => {
        store.commit('setFullscreen', false)
      }

      // 监听歌曲变化
      watch(currentSong, (val) => {
        if (!val.url || !val.pic) {
          return
        }

        // 更新播放地址
        const audioEl = audioRef.value
        audioEl.setAttribute('src', val.url)
      })

      return {
        audioRef,
        fullscreen,
        currentSong,
        closePlayer
      }
    }
  }
</script>

<style lang="scss" scoped>
  .player-wrapper {
    .normal-player {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $color-background;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;

      .bg-filter {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $color-background-d;
        backdrop-filter: blur(30px);
        z-index: 1;
      }

      .header {
        flex: 0 0 45px;
        position: relative;
        font-size: $font-size-large;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;

        .fullscreen-btn {
          position: absolute;
          left: 10px;

          .icon {
            font-size: $icon-size-s;
            color: $color-theme;
          }
        }
      }

      .body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;

        .singer-name {
          flex: 0 0 16px;
        }

        .cover-page {
          flex-grow: 1;
        }
      }

      .footer {
        flex: 0 0 130px;
        display: flex;
        flex-direction: column;
        padding: 0 30px;
        z-index: 2;

        .progress {
          flex: 0 0 30px;
          display: flex;
          align-items: center;

          .begin-time,
          .end-item {
            flex: 0 0 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .timeline {
            flex-grow: 1;
            position: relative;
            height: 5px;
            background-color: $color-background-d;
            margin: 0 10px;
            border-radius: 2px;

            .pointer {
              position: absolute;
              width: 15px;
              height: 15px;
              border: 3px solid $color-text;
              background-color: $color-theme;
              border-radius: 50%;
              left: 0;
              top: 50%;
              transform: translate3d(0, -50%, 0);
            }
          }
        }

        .operate {
          flex: 0 0 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .play-mode,
          .play-extra {
            flex: 0 0 50px;
          }

          .play-state {
            flex-grow: 1;
            margin: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .play-btn {
              .icon {
                font-size: $icon-size-x;
              }
            }
          }

          .btn {
            .icon {
              font-size: $icon-size;
              color: $color-theme;
            }
          }
        }
      }
    }
  }
</style>
