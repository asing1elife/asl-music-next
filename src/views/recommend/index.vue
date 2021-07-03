<template>
  <div class="recommend">
    推荐页
  </div>
</template>

<script>
  import recommendService from '@/service/recommend'

  export default {
    name: 'recommend',
    async created () {
      await this._findRecommends()
    },
    methods: {
      async _findRecommends () {
        const recommends = await recommendService.list()

        console.log(recommends)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
