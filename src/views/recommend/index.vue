<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <div class="slider-content">
        <m-slider
          v-if="sliders.length"
          :sliders="sliders"
        ></m-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import recommendService from '@/service/recommend'
  import MSlider from '@/components/base/slider'

  export default {
    name: 'recommend',
    components: {
      MSlider
    },
    data () {
      return {
        sliders: []
      }
    },
    async created () {
      await this._findRecommends()
    },
    methods: {
      async _findRecommends () {
        const recommends = await recommendService.list()

        this.sliders = recommends.sliders
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
