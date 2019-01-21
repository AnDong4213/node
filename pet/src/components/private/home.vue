<template>
  <el-row class="home">
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4" style='background: yellow'>
        <el-menu default-active="1" class="el-menu-vertical-demo" style='height: 400px'>
            <el-menu-item index="1"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物信息</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物相册</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>&nbsp;&nbsp;宠物日志</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-setting"></i>宠物朋友圈</el-menu-item>
            <el-menu-item index="5"><i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;&nbsp;问&nbsp;&nbsp;&nbsp;&nbsp;答&nbsp;&nbsp;</el-menu-item>
        </el-menu>
    </el-col>
    <el-col :span="16" style='background: #eee'>
        <form name='petform'>
            <table align='center' width='80%'>
                <tr>
                    <td><el-input name='nicheng' v-model="nicheng" placeholder="宠物昵称"></el-input></td>
                    <td rowspan='5'><img src='https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3337209369,4097509246&fm=85&s=91A38FBE0F104CCA033971C80300B0B0' />
                    </td>
                </tr>
                <tr>
                    <td align='left'>
                        <el-select name='pettype' v-model="pettype" placeholder="请选择宠物类别">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-input name='petsort' v-model="petsort" placeholder="宠物品种"></el-input>
                    </td>
                </tr>
                <tr>
                    <td align='left'>
                        <el-radio-group  v-model="sex">
                            <el-radio name='sex' :label="0">雄</el-radio>
                            <el-radio name='sex' :label="1">雌</el-radio>
                        </el-radio-group>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-input name='petage' v-model="petage" placeholder="宠物年龄"></el-input>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <el-input
                            name='introduce'
                            type="textarea"
                            :rows="2"
                            placeholder="宠物介绍"
                            v-model="textarea">
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td colspan='2' align='center'>
                        <el-button style="margin: 10px" type="success" @click='subpetInfo'>提交</el-button>
                    </td>
                </tr>
            </table>
        </form>
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
</el-row>
</template>

<script>
import { httpGet } from '@/common/httpBean'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
        options: [{
		  value: '0',
		  label: '狗'
		}, {
		  value: '1',
		  label: '猫'
		}, {
		  value: '2',
		  label: '鸟'
		}, {
		  value: '3',
		  label: '鱼'
		}, {
		  value: '4',
		  label: '其他'
        }],
        petage: '',
		pettype:'',
		petsort:'',
        sex:0,
        nicheng: '',
        textarea: ''
    }
  },
  computed: {
    ...mapGetters(['logInfoBean'])
  },
  methods: {
    subpetInfo() {
        
    }
  },
  mounted() {
    httpGet('/users/mypet', (data) => {
        console.log(data)
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