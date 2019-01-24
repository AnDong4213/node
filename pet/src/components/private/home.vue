<template>
  <el-row class="home">
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4" style='background: yellow'>
        <el-menu default-active="1" class="el-menu-vertical-demo" style='height: 400px'>
            <el-menu-item index="1"><i class="el-icon-setting"></i>&nbsp;&nbsp;佩奇信息</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-setting"></i>&nbsp;&nbsp;佩奇相册</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>&nbsp;&nbsp;佩奇日志</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-setting"></i>佩奇朋友圈</el-menu-item>
            <el-menu-item index="5"><i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;&nbsp;问&nbsp;&nbsp;&nbsp;&nbsp;答&nbsp;&nbsp;</el-menu-item>
        </el-menu>
    </el-col>
    <el-col :span="16" style='background: #eee'>
        <petform v-if="this.flag == 0" />
        <petinfo :dataArr="arr" v-if="this.flag > 0" />
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
</el-row>
</template>

<script>
import petform from './petform'
import petinfo from './petinfo'
import { httpGet, httpPost } from '@/common/httpBean'

export default {
  data () {
    return {
        flag: 0,
        arr: []
    }
  },
  created() {
    httpGet('/pet/mypetinfo', (data) => {
        if (data == 'loginExpired') {
            this.$router.push('/');
        } else {
            if (data.length > 0) {
                this.flag = 1;
                this.arr = data;
            } else {
                this.flag = 0;
            }
        }
    })
  },
  methods: {
    
  },
  components: {
    petform,
    petinfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        margin-top: 10px;
    }
</style>