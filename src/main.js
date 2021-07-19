import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 图片懒加载 https://github.com/ustbhuangyi/vue3-lazy
import lazyLoading from 'vue3-lazy'

// 自定义指令
import loadingDirective from '@/components/base/loading/directive'
import emptyDirective from '@/components/base/empty-tip/directive'

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(lazyLoading, {
    loading: require('@/assets/image/default.png')
  })
  // 指令会被渲染为 v-loading
  .directive('loading', loadingDirective)
  .directive('empty', emptyDirective)
  .mount('#app')
