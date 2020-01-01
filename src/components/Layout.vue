<template>
  <div class="layout">
    <div class="logo">
      <img src="../assets/imgs/MainLogo.png" alt="logo">
      <h1>Albums search engine</h1>
    </div>
    <searchComponent v-on:get-data="refresh" v-on:change-artist="setArtist"/>
    <div class="resultWrapper">
      <resultComponent 
      v-for="(service, index) in searchEnginesServices"
      v-bind:key="index"
      :albums="service"
      :artist="artist"
      :serviceName="index" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import searchComponent from './Search.vue';
  import resultComponent from './Result.vue';
  import {DEEZER, I_TUNES} from '@/constants/Vendors';
  import Album from '@/interfaces/Album'

  @Component({
    components: { searchComponent, resultComponent }
  })
  export default class Layout extends Vue {
    artist: string;
    searchEnginesServices: any;

    constructor(){
      super();
      this.artist = '';
      this.searchEnginesServices = {
        [DEEZER]: [], 
        [I_TUNES]:[]
      }
    }
    refresh(api: string, data: Album[]) {
      this.searchEnginesServices[api] = data;
    }
    setArtist(artist: string): void {
      this.artist = artist;
    }
  }
</script>

<style lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .resultWrapper {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid silver;
    display: flex;
    justify-content: center;

    div{
      margin: 0 20px;
    }
  }
  .logo {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    img {
      height: 250px;
      width: auto;
      margin: 20px auto;
    }
    h1 {
      margin: 0px auto 20px auto;
      font-family: 'Lilita One', cursive; //Font-link placed in the index html
      font-size: 30px;
    }
  }
</style>