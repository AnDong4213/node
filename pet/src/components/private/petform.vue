<template>
  <form name='petForm'>
    <table align='center'
           width='80%'>
      <tr>
        <td>
          <el-input name='nicheng'
                    v-model="petnicheng"
                    placeholder="佩奇昵称"></el-input>
        </td>
        <td rowspan='5'>
          <img style="width: 246px;height: 246px;"
               :src='imgsrc' /><br />
          <el-button type="success"
                     @click='chooseImg'>选择图片</el-button>
          <input ref="hideInput"
                 accept="image/*"
                 @change="choosed"
                 type="file"
                 name="petimg"
                 style="visibility: hidden;width: 20px;" />
          <span style="font-size: 12px;"
                ref="chooseLabel"></span>
        </td>
      </tr>
      <tr>
        <td align='left'>
          <el-select name='pettype'
                     v-model="pettype"
                     placeholder="请选择佩奇类别">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          <el-input name='petsort'
                    v-model="petsort"
                    placeholder="佩奇品种"></el-input>
        </td>
      </tr>
      <tr>
        <td align='left'>
          <el-radio-group v-model="petsex">
            <el-radio name='sex'
                      :label="0">雄</el-radio>
            <el-radio name='sex'
                      :label="1">雌</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td>
          <el-input name='age'
                    v-model="petage"
                    placeholder="佩奇年龄"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan='2'>
          <el-input name='introduce'
                    type="textarea"
                    :rows="2"
                    placeholder="佩奇介绍"
                    v-model="pettextarea">
          </el-input>
        </td>
      </tr>
      <tr>
        <td colspan='2'
            align='center'>
          <el-button style="margin: 10px"
                     type="success"
                     @click='subpetInfo'>提交3</el-button>
          <el-button style="margin: 10px"
                     type="success"
                     @click='returnPre'>返回</el-button>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import { httpBinaryPost, httpGet } from "@/common/httpBean";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "狗",
        },
        {
          value: "1",
          label: "猫",
        },
        {
          value: "2",
          label: "鸟",
        },
        {
          value: "3",
          label: "鱼",
        },
        {
          value: "4",
          label: "其他",
        },
      ],
      petage: "",
      pettype: "",
      petsort: "",
      petsex: 0,
      petnicheng: "",
      pettextarea: "",
      imgsrc:
        "http://www.runoob.com/wp-content/uploads/2015/07/7bf8bed24a17fbebd3e171f9630dbccb.gif",
    };
  },
  created() {
    let item = this.getInfoItem;
    if (item != null) {
      this.petage = item.age;
      switch (item.pettype) {
        case 0:
          item.pettype = "狗";
          break;
        case 1:
          item.pettype = "猫";
          break;
        case 2:
          item.pettype = "鸟";
          break;
        case 3:
          item.pettype = "鱼";
          break;
        default:
          item.pettype = "其他";
      }
      this.pettype = item.pettype;
      this.petsort = item.petsort;
      this.petsex = item.sex;
      this.petnicheng = item.nicheng;
      this.pettextarea = item.introduce;
      this.imgsrc = "/api" + item.petimg;
    }

    /* this.$watch('petsort', (newQuery, oldQuery) => {
		console.log(newQuery)
		console.log(oldQuery)
	}) */
    this.$watch(
      "petsort",
      this.throttle((newQuery, oldQuery) => {
        console.log(newQuery + "--" + oldQuery);
      }, 1000)
    );
  },
  computed: {
    ...mapGetters(["getInfoItem", "getPage"]),
  },
  methods: {
    // 防抖，只执行最后一次
    debounce(func, wait) {
      let timer = null;
      return function (...para) {
        // console.log(para) // ["vxvzx", "vxvz"]
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, para);
        }, wait);
      };
    },
    throttle(func, wait) {
      let timer = null;
      return function (...para) {
        if (!timer) {
          timer = setTimeout(() => {
            func.apply(this, para);
            timer = null;
          }, wait);
        }
      };
    },
    subpetInfo() {
      // console.log();
      this.$root.$children[0].$refs.headBar.$refs.Logins.zhuce({
        email: parseInt(Math.random() * 100000) + "" + "@qq.com",
        pwd: "123",
        nicheng: parseInt(Math.random() * 100000),
      });
      // console.log(petForm.petimg.files[0] == this.$refs.hideInput.files[0]);  // true
      let formObj = new FormData(petForm);
      let pettype = this.pettype;
      switch (this.pettype) {
        case "狗":
          pettype = 0;
          break;
        case "猫":
          pettype = 1;
          break;
        case "鸟":
          pettype = 2;
          break;
        case "鱼":
          pettype = 3;
          break;
        default:
          pettype = 4;
      }
      formObj.set("pettype", pettype);
      let item = this.getInfoItem;
      if (item != null) {
        formObj.set("flag", "1");
        formObj.set("id", item.id);
      }
      httpBinaryPost("/pet/subpetInfo", formObj, (res) => {
        if (res != "NO_PAGE") {
          if (res.flag) {
            httpGet("/pet/mypetinfo?page=" + this.getPage, (data) => {
              if (data == "loginExpired") {
                this.$router.push("/");
              } else {
                this.setPage(this.getPage);
                this.$emit("changeFlagOne", {
                  data: data[1],
                  count: data[0],
                });
              }
            });
          } else {
            httpGet("/pet/mypetinfo", (data) => {
              if (data == "loginExpired") {
                this.$router.push("/");
              } else {
                this.setPage(1);
                this.$emit("changeFlagOne", {
                  data: data[1],
                  count: data[0],
                });
              }
            });
          }
        }
      });
    },
    returnPre() {
      this.$emit("changeFlagOne");
    },
    chooseImg() {
      this.$refs.hideInput.click();
    },
    choosed() {
      this.$refs.chooseLabel.innerHTML = this.$refs.hideInput.value;
    },
    ...mapMutations(["setPage"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>