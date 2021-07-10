import { createRouter, createWebHashHistory } from 'vue-router'

import Recommend from '@/views/recommend'
import Singer from '@/views/singer'
import SingerDetail from '@/views/singer/detail'
import LeaderBoard from '@/views/leaderboard'
import Search from '@/views/search'

const routes = [
  {
    // 直接访问根请求时，默认会跳转到推荐页
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':mid',
        component: SingerDetail,
        props: true
      }
    ]
  },
  {
    path: '/leaderboard',
    component: LeaderBoard
  },
  {
    path: '/search',
    component: Search
  }
]

const router = createRouter({
  // 路由为 hash 模式
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
