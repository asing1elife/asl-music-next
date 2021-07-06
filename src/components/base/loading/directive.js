/**
 * v-loading 自定义指令
 * 参考 https://v3.cn.vuejs.org/guide/custom-directive.html
 */

import { createApp } from 'vue'
import Loading from '@/components/base/loading'
import { addClass, removeClass } from '@/assets/js/dom'

const POSITION_CLS = 'position-relative'

const loadingDirective = {
  mounted (el, binding) {
    // 创建 Vue 实例，并注册组件
    const app = createApp(Loading)
    // 创建并记录 DOM 实例
    el.instance = app.mount(document.createElement('div'))

    // 尝试获取传入的自定义值
    bindTip(el, binding)

    // 传入的值，比如 v-loading="true" 那么此时的 binding.value 的值就是 true
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    // 尝试获取传入的自定义值
    bindTip(el, binding)

    // 传入的值发生变化时，比如 v-loading="false"
    if (!binding.value) {
      remove(el)
    }
  }
}

function bindTip (el, binding) {
  // 尝试获取传入的自定义值
  const tip = binding.arg
  if (typeof tip !== 'undefined') {
    el.instance.setTip(tip)
  }
}

function append (el) {
  // 获取当前绑定节点的样式
  const style = getComputedStyle(el)

  // 如果节点的样式不包含以下三种，则尝试为节点添加定位样式
  if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
    addClass(el, POSITION_CLS)
  }

  // el 本身是使用 v-loading 的元素，instance.$el 则是动态创建出来的元素
  el.appendChild(el.instance.$el)
}

function remove (el) {
  if (!el.contains(el.instance.$el)) {
    return
  }

  // 移除时则可以直接移除
  removeClass(el, POSITION_CLS)

  el.removeChild(el.instance.$el)
}

export default loadingDirective
