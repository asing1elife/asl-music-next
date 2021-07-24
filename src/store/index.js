// createLogger 可以开启 Vuex 的系统日志
import { createStore, createLogger } from 'vuex'

/**
 * https://next.vuex.vuejs.org/zh/index.html
 */

import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

// 非开发环境开启调试
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  // 开发模式下开启严格模式
  strict: debug,
  // 开发模式下引入日志插件
  plugins: debug ? [createLogger()] : []
})
