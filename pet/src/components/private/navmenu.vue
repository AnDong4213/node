<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" style='height: 400px'>
        <el-menu-item index="1" @click="petInfo"><i class="el-icon-setting"></i>&nbsp;&nbsp;佩奇信息</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-setting"></i>&nbsp;&nbsp;佩奇相册</el-menu-item>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物日志</template>
            <el-menu-item index="3-1" @click='writeSay'>写说说</el-menu-item>
            <el-menu-item index="3-2">看说说</el-menu-item>
        </el-submenu>
        <el-menu-item index="4"><i class="el-icon-setting"></i>佩奇朋友圈</el-menu-item>
        <el-menu-item index="5"><i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;&nbsp;问&nbsp;&nbsp;&nbsp;&nbsp;答&nbsp;&nbsp;</el-menu-item>
    </el-menu>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    petInfo() {
        this.$router.push('/private/home')
    },
    writeSay() {
        this.$router.push('/private/writesay')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
