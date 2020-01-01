<template>
  <div class="result">
    <div class="engine">{{serviceName}}</div>
    <div class="artist">{{artist}}</div>
    <div class="album-block" v-for="(album, index) in albums" v-bind:key="index">
      <span>{{index + 1}}. </span>
      <span>{{album.title}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import Album from '@/interfaces/Album';

  @Component({})
  export default class Result extends Vue {
    @Prop({default: 'waiting for search..'}) readonly albums!: Album[];
    @Prop({default: 'waiting for search..'}) readonly artist!: string;
    @Prop({default: '...'}) readonly serviceName!: string;
    
    constructor() {
      super();
    }
  }
</script>

<style lang="scss">
  .result {
    justify-content: space-around;
  }
  .artist, .engine {
    font-family: 'Lilita One', cursive; //Font-link placed in the index html
    margin: 10px 0;
  }
  .artist {
    font-size: 24px;
  }
  .engine {
    color: silver;
    font-size: 30px;
  }

  .album-block {
    margin: 5px 0;
    span {
      font-size: 20px;
    }
  }
</style>