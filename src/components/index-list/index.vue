<template>
  <m-scroll class="index-list">
    <ul>
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
  </m-scroll>
</template>

<script>
  import MScroll from '@/components/base/scroll'

  export default {
    name: 'm-index-list',
    props: {
      groups: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      MScroll
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
  }
</style>
