<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";


export default {
  name: 'app',
  components:{
    appTable:Table,
    appHeader:Header
  }
}
</script>

<style scoped>

</style>
