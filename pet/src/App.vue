<template>
  <div id="app">
    <headBar ref="headBar" />
    <router-view />
    <diaLog ref="diaLog"></diaLog>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import DiaLog from '@/components/DiaLog'
export default {
  name: 'App',
  components: {
    headBar: HeadBar,
    diaLog: DiaLog
  },
  created() {
    // $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。
    // 关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。
    // console.log(this.$refs.diaLog);  // undefined
  },
  mounted() {
    // console.log(this.$refs.diaLog);  // 有值
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
.el-button--success {
  color: #fff;
  background-color: #ddd;
  border-color: #ccc;
}
.el-button--primary {
  color: #fff;
  background-color: #ddd;
  border-color: #ccc;
}
</style>
