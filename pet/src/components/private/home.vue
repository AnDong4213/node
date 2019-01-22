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
        <form name='petForm'>
            <table align='center' width='80%'>
                <tr>
                    <td><el-input name='nicheng' v-model="petnicheng" placeholder="佩奇昵称"></el-input></td>
                    <td rowspan='5'>
                        <img src='http://www.runoob.com/wp-content/uploads/2015/07/7bf8bed24a17fbebd3e171f9630dbccb.gif' /><br />
                        <el-button type="success" @click='chooseImg'>选择图片</el-button>
                        <input ref="hideInput" @change="choosed" type="file" name="petimg" style="visibility: hidden;width: 20px;" />
                        <span style="font-size: 12px;" ref="chooseLabel"></span>
                    </td>
                </tr>
                <tr>
                    <td align='left'>
                        <el-select name='pettype' v-model="pettype" placeholder="请选择佩奇类别">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-input name='petsort' v-model="petsort" placeholder="佩奇品种"></el-input>
                    </td>
                </tr>
                <tr>
                    <td align='left'>
                        <el-radio-group  v-model="petsex">
                            <el-radio name='sex' :label="0">雄</el-radio>
                            <el-radio name='sex' :label="1">雌</el-radio>
                        </el-radio-group>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-input name='age' v-model="petage" placeholder="佩奇年龄"></el-input>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <el-input
                            name='introduce'
                            type="textarea"
                            :rows="2"
                            placeholder="佩奇介绍"
                            v-model="pettextarea"
                        >
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
import { httpGet, httpPost, httpBinaryPost } from '@/common/httpBean'
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
		pettype: '',
		petsort: '',
        petsex: 0,
        petnicheng: '',
        pettextarea: ''
    }
  },
  computed: {
    ...mapGetters(['logInfoBean'])
  },
  methods: {
    subpetInfo() {
        let formObj = new FormData(petForm);
        formObj.set('pettype', this.pettype);
        httpBinaryPost('/pet/subpetInfo', formObj, (data) => {
            console.log(data)
        })
    },
    chooseImg() {
        this.$refs.hideInput.click();
    },
    choosed() {
        this.$refs.chooseLabel.innerHTML = this.$refs.hideInput.value;
    }
  },
  mounted() {
    /* httpGet('/users/mypet', (data) => {
        console.log(data)
    }) */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        margin-top: 10px;
    }
</style>