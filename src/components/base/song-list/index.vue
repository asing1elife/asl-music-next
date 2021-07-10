<template>
  <div class="song-list">
    <div
      class="song-item"
      v-for="song in songs"
      :key="song.id"
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
