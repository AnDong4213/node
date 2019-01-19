<template>
  <el-row>
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4" style='background: #f9fafc;font-size:2em'>
      <i class="el-icon-menu"></i>宠物空间
    </el-col>
    <el-col :span="10" style='background: #f9fafc'>
    	<el-input
      	placeholder="请输入搜索关键词"
      	suffix-icon="el-icon-search"
      	v-model="input2">
  	  </el-input>
    </el-col>
    <el-col :span="6"  style='background: #f9fafc'>
    	<el-button type="success" @click="showLogin">登录/注册</el-button>
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
  </el-row>
</template>

<script>
import Login from './Login'
export default {
  name: 'HelloWorld',
  props: {
    data: {
      type: String,
      default: 'uu'
    }
  },
  data () {
    return {
      input2: 'dd'
    }
  },
  methods: {
    showLogin() {
      this.$parent.$refs.diaLog.showDiaLog(Login)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
