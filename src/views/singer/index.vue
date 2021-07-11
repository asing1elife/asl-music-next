<template>
  <div
    class="singer"
    v-loading="!singers.length"
  >
    <m-index-list
      :groups="singers"
      @select="onSingerSelect"
    >
    </m-index-list>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component
          :is="Component"
          :singer="singer"
        />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import MIndexList from '@/components/index-list'
  import singerService from '@/service/singer'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/assets/js/constant'

  export default {
    name: 'singer',
    components: {
      MIndexList
    },
    data () {
      return {
        singers: [],
        singer: undefined
      }
    },
    async created () {
      const result = await singerService.list()

      this.singers = result.singers
    },
    methods: {
      onSingerSelect (singer) {
        this.singer = singer

        // 缓存当前选中歌手
        this._cacheSinger(singer)

        this.$router.push({
          path: `/singer/${ singer.mid }`
        })
      },
      // 缓存歌手
      _cacheSinger (singer) {
        storage.session.set(SINGER_KEY, singer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 20px;
  }
</style>
