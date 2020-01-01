<template>
  <div>
    <form class="searchbar-wrapper" @submit.prevent="submit">
      <div class="fake-search-icon"></div>
      <input 
        v-model="artist"
        placeholder="artist name.."
      />
      <button type="submit">GO</button>
    </form>
    <div class="checkbox-wrapper">
      <searchCheckbox
        v-for="(item, index) in checkboxEngines"
        v-bind:key="index"
        :name="item"
        v-on:update-checker="setSearchOptions" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import searchCheckbox from "./searchCheckbox.vue";
import EngineSearchParams from "@/interfaces/EngineSearchParams";
import {DeezerApi, DeezerDataResponse} from "@/api/DeezerApi";
import {ITunesApi, ITunesDataResponse} from '@/api/ITunesApi'
import {DEEZER, I_TUNES} from "@/constants/Vendors.ts";
import DeezerSong from '@/interfaces/DeezerSong';
import Album from '@/interfaces/Album';
import ITunesSong from '../interfaces/ITunesSong';

@Component({
  components: { searchCheckbox }
})
export default class Search extends Vue {
  artist: string;
  searchEngines: {[key: string]: EngineSearchParams};


  constructor() {
    super();
    this.artist = "Eminem";
    this.searchEngines = {
      [DEEZER]: {
        method: this.getDeezer,
        show: true
      },
      [I_TUNES]: {
        method: this.getItunes,
        show: true
      }
    }
  }

  getDeezer(): void {
    DeezerApi.artistSongs(this.artist)
    .then( (response: Response) => response.json() )
    .then( (response: DeezerDataResponse) => {
      
      let albums = response.data.map( (song: DeezerSong) => {
        return new Album(song.title);
      });
      this.$emit('get-data', DEEZER, albums);
    })
    .catch( err => {
      console.log(err);
      alert("something going wrong with Deezer..");
    })
  }


  getItunes(): void {
    ITunesApi.artistSongs(this.artist)
    .then( (response: Response) => response.json())
    .then( (response: ITunesDataResponse) => {
      
      let albums = response.results.map( (album: ITunesSong) => {
        return new Album(album.collectionName);
      });
      this.$emit('get-data', I_TUNES, albums);
    })
    .catch( err => {
      console.log(err);
      alert("something going wrong with ITunes..");
    })
  }

  /* choose between true and false checkbox status */
  setSearchOptions(name: string, status: boolean): void {
    this.searchEngines[name].show = status;
  }

  /* get API data after enter press or click on the button Go  */
  submit(): void {
    this.$emit('change-artist', this.artist );
    if(!this.artist) { //if empty:
      this.$emit('get-data', DEEZER, []); 
      this.$emit('get-data', I_TUNES, []);
      return;
    }
    Object.keys(this.searchEngines).forEach( (engine: string) => {
      if(this.searchEngines[engine].show) {
        this.searchEngines[engine].method();
      }
    })
  }

  get checkboxEngines() {
    return Object.keys(this.searchEngines);
  }
}
</script>

<style lang='scss'>
$mainColor: rgba(110, 110, 110, 0.5);

.searchbar-wrapper {
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  height: 50px;

  .fake-search-icon {
    z-index: 3;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 15px;
    left: 15px;
    background-color: rgba(110, 110, 110, 0.9);
    mask-image: url("../assets/imgs/searching-magnifying-glass.svg");
    mask-repeat: no-repeat;
    mask-size: 100%;
  }

  input {
    z-index: 2;
    border: none;
    margin: 0 0px 0 0;
    padding: 5px 15px 5px 48px;
    box-shadow: -2px 6px 20px 0px $mainColor;
    border-radius: 15px 0 0 15px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    color: #2c3e50;
    font-size: 20px;
    width: 400px;

    &:focus {
      outline: none;
    }
  }
  button {
    z-index: 1;
    border: none;
    background-color: rgb(182, 213, 228);
    width: 100px;
    text-align: center;
    color: white;
    border-radius: 0 15px 15px 0;
    box-shadow: 0px 5px 20px 2px $mainColor;
    transition: color 0.5s, box-shadow 0.5s, background-color 0.5s;
    font-weight: 800;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: rgb(164, 195, 231);
      cursor: pointer;
    }
  }
}
.checkbox-wrapper {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>