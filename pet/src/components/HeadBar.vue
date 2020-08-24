<template>
  <el-row>
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4"
            style='background: #f9fafc;font-size:2em;color: #eee'>
      <i class="el-icon-menu"></i>
      <span @click="returnIndex"
            style="cursor: pointer;">{{getbean ? getbean.nicheng : '佩奇'}}空间</span>
    </el-col>
    <el-col :span="10"
            style='background: #f9fafc'>
      <el-input placeholder="请输入搜索关键词"
                suffix-icon="el-icon-search"
                v-model="input2">
      </el-input>
    </el-col>
    <el-col :span="6"
            style='background: #f9fafc'>
      <el-button v-if="getIsExpired == 'nologin'"
                 type="success"
                 @click="showLogin">登录/注册</el-button>
      <div v-if="getIsExpired == 'login'"
           style='font-size:1.2em'>
        <span @click="showHome"
              style="cursor: pointer;">主页</span>
        <span>空间</span>
        <span>寄养</span>
        <span>医院</span>
        <span>食物</span>
        <span style="cursor: pointer;color: lightblue"
              @click='logout'>注销</span>
      </div>
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
    <Login ref="Logins" />
  </el-row>
</template>

<script>
import Login from "./Login";
import { mapGetters, mapMutations } from "vuex";
import { httpGet } from "@/common/httpBean";

export default {
  props: {
    nicheng: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["getIsExpired", "getbean"]),
  },
  data() {
    return {
      input2: "",
    };
  },
  methods: {
    showLogin() {
      this.$parent.$refs.diaLog.showDiaLog(Login);
    },
    logout() {
      httpGet("/user/logout", (res) => {
        if (res == "ok") {
          this.$router.push("/");
          this.setIsExpired("nologin");
          this.setbean(null);
        }
      });
    },
    ...mapMutations(["setIsExpired", "setbean"]),
    showHome() {
      this.$router.push("/private/home");
    },
    returnIndex() {
      this.$router.push("/");
    },
  },
  components: {
    Login,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
