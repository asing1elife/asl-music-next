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
                @click="changeMode"
              >
                <i :class="modeCls"></i>
              </a>
            </div>
            <div class="play-state">
              <a
                href="javascript:"
                class="btn"
                :class="disableCls"
                @click="prev"
              >
                <i class="icon icon-previous"></i>
              </a>
              <a
                href="javascript:"
                class="btn play-btn"
                :class="disableCls"
                @click="togglePlay"
              >
                <i :class="playBtnCls"></i>
              </a>
              <a
                href="javascript:"
                class="btn"
                :class="disableCls"
                @click="next"
              >
                <i class="icon icon-next"></i>
              </a>
            </div>
            <div class="play-extra">
              <a
                href="javascript:"
                class="btn"
                @click="toggleLike"
              >
                <i :class="likeBtnCls"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio
      autoplay
      ref="audioRef"
      @canplay="readyHandler"
      @error="errorHandler"
    ></audio>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import useStatus from './use-status'
  import useControl from './use-control'
  import useMode from './use-mode'
  import useLike from './use-like'

  export default {
    name: 'm-player',
    setup () {
      const audioRef = ref(null)
      const songReady = ref(false)

      // 当前歌曲状态监控
      const { currentSong, disableCls, readyHandler, errorHandler } = useStatus(audioRef, songReady)
      // 播放、切歌控制
      const { fullscreen, playBtnCls, closePlayer, togglePlay, prev, next } = useControl(audioRef, songReady)
      // 切换模式
      const { modeCls, changeMode } = useMode()
      // 收藏操作
      const { likeBtnCls, toggleLike } = useLike(currentSong)

      return {
        audioRef,
        currentSong,
        fullscreen,
        playBtnCls,
        disableCls,
        modeCls,
        likeBtnCls,
        closePlayer,
        changeMode,
        togglePlay,
        toggleLike,
        prev,
        next,
        readyHandler,
        errorHandler
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'index';
</style>
