<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <component :is="currentView"></component>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      currentView: null
    }
  },
  methods: {
    showDiaLog(vnode) {
      this.currentView = vnode
      this.dialogVisible = true
    },
    hideDiaLog() {
      this.dialogVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
