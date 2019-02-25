<template>
  <div class="hello">
    <el-switch
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949">
  </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
