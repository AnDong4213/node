<template>
  <div id="app">
    <headBar />
    <router-view/>
  </div>
</template>

<script>
import HeadBar from './components/HeadBar'
export default {
  name: 'App',
  components: {
    headBar: HeadBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
