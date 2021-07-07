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
    <router-view :singer="singer"></router-view>
  </div>
</template>

<script>
  import MIndexList from '@/components/index-list'
  import singerService from '@/service/singer'

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

        this.$router.push({
          path: `/singer/${ singer.mid }`
        })
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
