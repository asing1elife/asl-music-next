<template>
  <div class="song-list">
    <div
      class="song-item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="select(song, index)"
    >
      <p class="title">{{song.name}}</p>
      <p class="desc">{{song.singer}} - {{song.album}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'm-song-list',
    props: {
      songs: {
        type: Array,
        default: () => []
      }
    },
    emits: ['select'],
    methods: {
      select (song, index) {
        this.$emit('select', {
          song,
          index
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .song-list {
    .song-item {
      margin-bottom: 20px;

      .desc {
        color: $color-text-d;
        margin-top: 10px;
        font-size: $font-size-medium;
      }
    }
  }
</style>
