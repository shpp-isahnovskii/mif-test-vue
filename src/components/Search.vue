<template>
  <div>
    <div class="searchbar-wrapper">
      <div class="fake-search-icon"></div>
      <input v-model="inputMessage" placeholder="artist name.." v-on:keyup.enter="submit(searchIn)" />
      <button v-on:click="submit(searchIn)">GO</button>
    </div>
    <div class="checkbox-wrapper">
      <searchCheckbox
        v-for="(item, index) in searchEngines"
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

@Component({
  components: { searchCheckbox }
})
export default class Search extends Vue {
  inputMessage: string;
  searchIn: any;    //?
  searchEngines: string[];


  constructor() {
    super();
    this.inputMessage = "";
    this.searchEngines = ["Dezzer", "iTunes"];
    this.searchIn = {   //?
      Dezzer: true,
      iTunes: true
    };

  }

  /* choose between true and false checkbox status */
  setSearchOptions(name: string, status: boolean): void {
    this.searchIn[name] = status;
  }

  /* get API data after enter press or click on the button Go  */
  submit(searchIn: any): void {
    
    for (let element in searchIn) {
      if (searchIn[element] && this.inputMessage !=="") { //hardcoded
        this.getData(element, this.inputMessage);
      }
    }
    this.inputMessage = "";
  }

    /* get data from the Dezzer */
  getData(api: string, artist: string): void {

    let url = '';

    //add proxy url for localhost server: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const options = {
      method: "GET",
    }

    if(api === 'Dezzer') { //hardcoded
      url = "https://api.deezer.com/search?q=" + artist;
    }
    if(api === 'iTunes') {
      url = "https://api.deezer.com/search?q=" + artist + "&entity=music";
    }

    fetch(proxyUrl + url, options)
    .then( reresponce => reresponce.json() )
    .then( result => this.showDataResult(api, artist, result.data) )
    .catch( err => console.log(err) );
  }

  /* function send data to parent component, then parent will send it to result */
  showDataResult(api:string, artist: string, data: any) {
    console.log(data);
    this.$emit("submitted-data", api, artist, data);
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
    &:before {
      content: "asd";
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
    //border-left: 0px solid $mainColor;
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