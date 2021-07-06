<template>
  <m-scroll
    class="index-list"
    :probe-type="3"
    @scroll="onScroll"
  >
    <ul ref="groupRef">
      <li
        class="group-label-item"
        v-for="group in groups"
        :key="group.title"
      >
        <span class="group-label">{{group.title}}</span>
        <ul>
          <li
            class="group-item"
            v-for="item in group.list"
            :key="item.id"
          >
            <img v-lazy="item.pic">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="fixed-label"
      v-show="fixedLabel"
      :style="fixedStyle"
    >
      {{fixedLabel}}
    </div>
  </m-scroll>
</template>

<script>
  import MScroll from '@/components/base/scroll'
  import useFixed from '@/components/index-list/use-fixed'

  export default {
    name: 'm-index-list',
    props: {
      groups: {
        type: Array,
        default: () => []
      }
    },
    components: {
      MScroll
    },
    setup (props) {
      const { groupRef, fixedLabel, fixedStyle, onScroll } = useFixed(props)

      return {
        groupRef,
        fixedLabel,
        fixedStyle,
        onScroll
      }
    }
  }
</script>

<style lang="scss" scoped>
  .index-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .group-label-item {
      .group-label {
        display: inline-block;
        width: 100%;
        padding: 10px 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background-color: $color-highlight-background;
        margin-bottom: 20px;
      }

      .group-item {
        margin-left: 30px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        color: $color-text-l;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;
        }
      }
    }

    .fixed-label {
      position: absolute;
      top: 0;
      display: inline-block;
      width: 100%;
      padding: 10px 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background-color: $color-highlight-background;
    }
  }
</style>
