<template>
  <layoutComponent/>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import layoutComponent from "./components/Layout.vue";

  @Component({
  components: { layoutComponent }
  })
  export default class App extends Vue {}
</script>

<style>
  body {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
  }
</style>
