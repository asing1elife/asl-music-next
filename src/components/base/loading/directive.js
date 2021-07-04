/**
 * v-loading 自定义指令
 * 参考 https://v3.cn.vuejs.org/guide/custom-directive.html
 */

import { createApp } from 'vue'
import Loading from '@/components/base/loading'

const loadingDirective = {
  mounted (el, binding) {
    // 创建 Vue 实例，并注册组件
    const app = createApp(Loading)
    // 创建并记录 DOM 实例
    el.instance = app.mount(document.createElement('div'))

    // 传入的值，比如 v-loading="true" 那么此时的 binding.value 的值就是 true
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    // 传入的值发生变化时，比如 v-loading="false"
    if (!binding.value) {
      remove(el)
    }
  }
}

function append (el) {
  // el 本身是使用 v-loading 的元素，instance.$el 则是动态创建出来的元素
  el.appendChild(el.instance.$el)
}

function remove (el) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective
