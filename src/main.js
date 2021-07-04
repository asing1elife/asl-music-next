import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 图片懒加载 https://github.com/ustbhuangyi/vue3-lazy
import lazyLoading from 'vue3-lazy'

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).use(lazyLoading, {
  loading: require('@/assets/image/default.png')
}).mount('#app')
