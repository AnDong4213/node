<template>
  <el-row class="home">
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4" style='background: yellow'>
        <el-menu default-active="2" class="el-menu-vertical-demo" style='height: 400px'>
            <el-menu-item index="1"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物信息</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物相册</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物日志</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-setting"></i>宠物朋友圈</el-menu-item>
            <el-menu-item index="5"><i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;&nbsp;问&nbsp;&nbsp;&nbsp;&nbsp;答&nbsp;&nbsp;</el-menu-item>
        </el-menu>
    </el-col>
    <el-col :span="16" style='background: green'>
        <p>UI哦既怕</p>
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
</el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      
    }
  },
  mounted() {
      axios.get('/api/users/mypet')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        alert(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        margin-top: 10px;
    }
</style>