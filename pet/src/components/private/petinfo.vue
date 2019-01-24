<template>
  <div>
    <el-table
      :data="dataArr"
      style="width: 100%"
    >
      <el-table-column
        label="宠物照片"
      >
        <template slot-scope="scope">
          <img :src="'api'+scope.row.petimg" width='80' height='80' />
        </template>
      </el-table-column>
      <el-table-column
        prop="nicheng"
        label="宠物信息"
      >
      </el-table-column>
      <el-table-column
        type='button'
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click='updPetInfo(scope.row)'>修改</el-button>
          <el-button type="primary" @click='delPetInfo(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin: 10px 0" type="primary" @click='add'>增加</el-button>
  </div>
</template>

<script>
export default {
  props: {
    dataArr: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
    }
  },
  created() {
    // console.log(this.dataArr)
  },
  methods: {
    updPetInfo(row) {
      console.log(row)
    },
    delPetInfo(id) {
      console.log(id)
    },
    add() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
