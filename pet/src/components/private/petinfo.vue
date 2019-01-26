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
        label="宠物昵称"
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
    <table style="width: 100%;">
      <tr style="align: center;">
        <td>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="count">
          </el-pagination>
        </td>
      </tr>
    </table>
    <el-button style="margin: 10px 0" type="primary" @click='add'>增加</el-button>
  </div>
</template>

<script>
import { httpGet } from '@/common/httpBean'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    dataArr: {
      type: Array,
      default: []
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageSize: 4,
      currentPage: 1
    }
  },
  created() {
    this.currentPage = this.getPage == null ? this.currentPage : this.getPage;
  },
  computed: {
    ...mapGetters(['getPage'])
  },
  methods: {
    updPetInfo(row) {
      this.setInfoItem(row)
      this.setPage(this.currentPage)
      this.$emit('changeFlagZero')
    },
    delPetInfo(id) {
      if (confirm('确定删除吗?')) {
        httpGet('/pet/delpetInfo?id=' + id, (data) => {
          if (data.result) {
            this.handleCurrentChange(1);
            this.currentPage = 1;
          }
        });
      }
    },
    add() {
      // this.$root.$children[0].$refs.diaLog.showDiaLog(petform);
      this.$emit('changeFlagZero');
      this.setInfoItem(null);
      this.setPage(this.currentPage)
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      httpGet('/pet/mypetinfo?page='+page, (data) => {
        if (data == 'loginExpired') {
          this.$router.push('/');
        } else {
          this.$emit('changeFlagZero',{
            data: data[1],
            count: data[0]
          })
        }
      })
    },
    ...mapMutations(['setInfoItem','setPage'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
