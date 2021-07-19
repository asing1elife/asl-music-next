<template>
  <div class="empty-tip-wrapper">
    <div class="empty-tip">
      <div class="bg"></div>
      <p class="tip">{{tip}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'm-empty-tip',
    data () {
      return {
        tip: '空空如也'
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
  .empty-tip-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $color-background;
    top: 0;

    .empty-tip {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      .bg {
        width: 100px;
        height: 100px;
        @include bg-image('./image/bg');
        background-size: cover;
      }

      .tip {
        line-height: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
    }
  }
</style>
