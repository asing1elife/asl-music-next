<template>
  <div class="loading-wrapper">
    <div class="loading-content">
      <img src="./image/loading.gif">
      <p class="tip">{{tip}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'm-loading',
    data () {
      return {
        tip: ''
      }
    },
    methods: {
      setTip (tip) {
        this.tip = tip
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $color-background;
    top: 0;

    .loading-content {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      img {
        width: 24px;
        height: 24px;
      }

      .tip {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
      }
    }
  }
</style>
