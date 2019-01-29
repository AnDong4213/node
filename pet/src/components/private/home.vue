<template>
  <el-row class="home">
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4" style='background: yellow'>
        <navmenu />
    </el-col>
    <el-col :span="16" style='background: #eee'>
        <petform @changeFlagOne="changeFlagOne" v-if="this.flag == 0" />
        <petinfo @changeFlagZero="changeFlagZero" :dataArr="arr" :count="count" v-if="this.flag > 0" />
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
</el-row>
</template>

<script>
import petform from './petform'
import petinfo from './petinfo'
import navmenu from './navmenu';
import { httpGet, httpPost } from '@/common/httpBean'

export default {
  data () {
    return {
        flag: 0,
        arr: [],
        count: 0
    }
  },
  created() {
    httpGet('/pet/mypetinfo', (data) => {
        if (data == 'loginExpired') {
            this.$router.push('/');
        } else {
            if (data[1].length > 0) {
                this.flag = 1;
                this.count = data[0];
                this.arr = data[1];
            } else {
                this.flag = 0;
            }
        }
    })
  },
  methods: {
    writeSay() {
        this.$router.push('/private/writesay')
    },
    changeFlagZero(data) {
        if (data == undefined) {
            this.flag = 0;
        } else {
            this.arr = data.data;
            this.count = data.count;
        }
    },
    changeFlagOne(data) {
        if (data == undefined) {
            this.flag = 1;
        } else {
            this.flag = 1;
            this.arr = data.data;
            this.count = data.count;
        }
    }
  },
  components: {
    petform,
    petinfo,
    navmenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        margin-top: 10px;
    }
</style>