<template>
  <div>
    <div class="logo">
      <img src="../assets/imgs/MainLogo.png" alt="logo">
      <h1>Albums search engine</h1>
    </div>
    <searchComponent v-on:submitted-data="refresh"/>
    <div class="resultWrapper">
      <resultComponent class="result" :data="dataDezzer" :artist="nameDezzer" engine="Dezzer" />
      <resultComponent class="result" :data="dataiTunes" :artist="nameiTunes" engine="iTunes"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import searchComponent from './Search.vue';
  import resultComponent from './Result.vue';

  @Component({
    components: { searchComponent, resultComponent }
  })
  export default class Layout extends Vue {
    dataiTunes: any[]; //hardcoded
    dataDezzer: any[];
    nameiTunes: string;
    nameDezzer: string;

    constructor(){
      super();
      this.dataiTunes = [{}];
      this.dataDezzer = [{}];
      this.nameiTunes = '';
      this.nameDezzer = '';
    }

    refresh(api:string, name: string, data: object[]) { //hardcoded
      if(api === 'Dezzer') {
        this.dataDezzer = data;
        this.nameDezzer = name;
      }
      if(api === 'iTunes') {
        this.dataiTunes = data;
        this.nameiTunes = name;
      }
    }
  }
</script>

<style lang="scss">
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
  .result {
    justify-content: space-around;
  }
</style>