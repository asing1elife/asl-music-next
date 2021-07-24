import { PLAY_MODE } from '@/assets/js/constant'

const state = {
  // 歌曲当前索引
  currentIndex: 0,
  // 播放模式
  playMode: PLAY_MODE.sequence,
  // 正在播放
  playing: false,
  // 是否全屏
  fullscreen: false,
  // 歌曲列表
  playlist: [],
  // 歌曲序列
  sequences: []
}

export default state
