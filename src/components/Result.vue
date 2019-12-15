<template>
  <div>
    <div class="engine">{{engine}}</div>
    <div class="artist">{{artist}}</div>
    <div class="album-block" v-for="(item, index) in text" v-bind:key="index">
      <span>{{index + 1}}. </span>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

  @Component({})
  export default class Result extends Vue {
    text: any[];
    @Prop({default: 'waiting for search..'}) readonly data!: any[];
    @Prop({default: '...'}) readonly artist!: string;
    @Prop({default: '...'}) readonly engine!: string;

    constructor() {
      super();
      this.text = [];
    }

    @Watch('data')
    parseData(newData: any[]) {
      this.text = newData.map( (element: any) => element.title );
    }
  }
</script>

<style lang="scss">
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