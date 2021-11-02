<template>
  <div class="hello">
    <el-button type='primary'>主要按钮</el-button>
    <el-input v-model="num"
              type="number"
              :min="Number('40')"
              :max="big"
              @blur="brokerBlur"
              size="mini"></el-input>
    <a href="http://d.xmwan.com/yssdaz/10093/10808/yssdaz_35958.apk">APK链接</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: null,
      big: 55,
    };
  },
  methods: {
    brokerBlur() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
