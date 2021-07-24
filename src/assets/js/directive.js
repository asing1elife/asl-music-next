/**
 * 自定义指令
 * 参考 https://v3.cn.vuejs.org/guide/custom-directive.html
 */

import { createApp } from 'vue'
import { addClass } from '@/assets/js/dom'

const POSITION_CLS = 'position-relative'

export default (component) => {
  return {
    mounted (el, binding) {
      // 创建 Vue 实例，并注册组件
      const app = createApp(component)

      // 创建并记录 DOM 实例
      el[component.name] = app.mount(document.createElement('div'))

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
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function bindTip (el, binding) {
    // 尝试获取传入的自定义值
    const tip = binding.arg
    if (typeof tip !== 'undefined') {
      el[component.name].setTip(tip)
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
    el.appendChild(el[component.name].$el)
  }

  function remove (el) {
    if (!el.contains(el[component.name].$el)) {
      return
    }

    el.removeChild(el[component.name].$el)
  }
}
