<template>
	<table  align='center'>
		<tr align='center'>
			<td>登录</td>
			<td>注册</td>
		</tr>
		<tr>
			<td>
        <form name='loginForm'>
          <table height='249px'>
            <tr>
              <td align='right'>email:</td>
              <td align='right'>
                <el-input v-model="loginemail" name="email" placeholder="请输入email"></el-input>
              </td>
            </tr>
            <tr>
              <td align='right'>密码:</td>
              <td align='right'>
                <el-input v-model="loginpwd" type='password' name="pwd"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan='2' align='center'>
                <el-button type="primary" @click="login">登录</el-button>
              </td>
            </tr>
          </table>
        </form>
		  </td>

		  <td>
        <form name='zhuceForm'>
          <table align='center'>
            <tr>
              <td align='right'>email:</td>
              <td align='right'>
                <el-input v-model="zcemail" name="email" placeholder="请输入email"></el-input>
              </td>
            </tr>
            <tr>
              <td align='right'>密码:</td>
              <td align='right'>
                <el-input v-model="zcpwd" type='password' name="pwd"></el-input>
              </td>
            </tr>
            <tr>
              <td align='right'>重复密码:</td>
              <td align='right'>
                <el-input v-model="zcrepwd" type='password' name="repwd"></el-input>
              </td>
            </tr>
            <tr>
              <td align='right'>昵称:</td>
              <td align='right'>
                <el-input v-model="zcnicheng" name="nicheng"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan='2' align='center'>
                <el-button type="primary" @click="zhuce">注册</el-button>
              </td>
            </tr>
          </table>
        </form>
		  </td>
		</tr>
	</table>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    // console.log(99)  // 呵呵了，只渲染一次，不是动态的...
    return {
      loginemail: '',
      loginpwd: '',
      zcemail: '',
      zcpwd: '',
      zcrepwd: '',
      zcnicheng: ''
    }
  },
  methods: {
    zhuce() {
      // alert(zhuceForm.email.value)
      let formObj = {
        email: this.zcemail,
        pwd: this.zcpwd,
        nicheng: this.zcnicheng
      };
      axios.post('/api/users/zhuce', formObj)
      .then(res => {
        let data = res.data;
        if (data == 1) {
          this.login(this.zcemail, this.zcpwd);
          alert('注册成功');
        } else if (data == 2) {
          alert('email重复')
        } else if (data == 3) {
          alert('昵称重复...')
        } else {
          alert('数据库错误,请稍后再试...')
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    login(email, pwd) {
      let formObj = {};
      if (pwd == undefined) {
        formObj = {
          email: this.loginemail,
          pwd: this.loginpwd,
        }
      } else {
        formObj = {
          email,
          pwd
        };
        this.loginemail = email;
        this.loginpwd = pwd;
      }
      axios.post('/api/users/login', formObj)
      .then(res => {
        if (res.data == 1) {
          this.$parent.$parent.hideDiaLog();
          this.$parent.$parent.$parent.$refs.headBar.flag = 1;
          this.loginemail = '';
          this.loginpwd = '';
          this.$router.push('/private/home');
        } else {
          alert('账号/密码错误')
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
