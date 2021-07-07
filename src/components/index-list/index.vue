<template>
  <m-scroll
    class="index-list"
    ref="scrollRef"
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
            @click="onSingerClick(item)"
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
    <ul
      class="fixed-labels"
      @touchstart.stop.prevent="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
    >
      <li
        class="label-item"
        v-for="(label, index) in labels"
        :data-index="index"
        :key="label"
        :class="{'active' : label === fixedLabel}"
      >
        {{label}}
      </li>
    </ul>
  </m-scroll>
</template>

<script>
  import MScroll from '@/components/base/scroll'
  import useFixed from '@/components/index-list/use-fixed'
  import useShortcut from '@/components/index-list/use-shortcut'

  export default {
    name: 'm-index-list',
    components: {
      MScroll
    },
    props: {
      groups: {
        type: Array,
        default: () => []
      }
    },
    emits: ['select'],
    setup (props, { emit }) {
      // 实现列表滚动时，顶栏标签动态变化
      const { groupRef, fixedLabel, fixedStyle, onScroll } = useFixed(props)
      // 实现点击右侧快捷栏时，列表动态变化
      const { scrollRef, labels, onTouchStart, onTouchMove } = useShortcut(props, groupRef)

      function onSingerClick (singer) {
        emit('select', singer)
      }

      return {
        groupRef,
        scrollRef,
        fixedLabel,
        fixedStyle,
        labels,
        onScroll,
        onTouchStart,
        onTouchMove,
        onSingerClick
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

    .fixed-labels {
      position: fixed;
      right: 5px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      background-color: $color-background-d;
      padding: 20px 0;
      border-radius: 15px;
      color: $color-text-l;

      .label-item {
        text-align: center;
        margin-bottom: 5px;
        padding: 0 5px;

        &.active {
          color: $color-theme;
        }
      }
    }
  }
</style>
