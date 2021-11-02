<template>
  <div id="app">
    <headBar ref="headBar" />
    <router-view />
    <diaLog ref="diaLog"></diaLog>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar";
import DiaLog from "@/components/DiaLog";
import { httpGet } from "@/common/httpBean";
import { mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      nicheng: ""
    };
  },
  components: {
    headBar: HeadBar,
    diaLog: DiaLog
  },
  created() {
    // $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。
    // 关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。
    // console.log(this.$refs.diaLog);  // undefined
    httpGet("/user/getLoginBean", res => {
      // console.log(res)
      if (res.nicheng) {
        this.setbean(res);
        this.setIsExpired("login");
      } else {
        this.setIsExpired("nologin");
        this.$router.push("/");
        this.setbean(null);
      }
    });
  },
  methods: {
    ...mapMutations(["setIsExpired", "setbean"])
  },
  mounted() {
    var isFormData = v => {
      return Object.prototype.toString.call(v) === "[object FormData]";
    };
    var baseCrawlerURL = "http://loading-crawler.appadhoc.com/form/submit";
    function sendFunc(cb) {
      if (cb) {
        var proxiedOpen = window.XMLHttpRequest.prototype.open;
        var proxiedSend = window.XMLHttpRequest.prototype.send;
        var requestObj = [];
        window.XMLHttpRequest.prototype.open = function(...para) {
          requestObj.push(para);
          return proxiedOpen.apply(this, para);
        };

        window.XMLHttpRequest.prototype.send = function(...para) {
          // console.log("para[0]", para[0]);
          if (para[0] && !isFormData(para[0])) {
            requestObj.push([para[0]]);
          } else {
            requestObj.push(isFormData(para[0]) ? `${para[0]}` : para);
          }

          cb(requestObj);
          requestObj = [];
          proxiedSend.apply(this, para);
        };
      }
    }
    function handleInterceptClick(e) {
      e.stopImmediatePropagation;
      e.stopPropagation;
      sendFunc(rObj => {
        var arrUrl = rObj.filter(url => url[0] && url.length === 3);
        var arrPara = rObj.filter(url => url[0] && url.length === 1);

        var arr = arrUrl.map((item, index) => {
          return {
            id: "HTTP_LANDING_PAGE_ID",
            method: item[0],
            location: item[1],
            content: arrPara[index] ? arrPara[index][0] : "{}"
          };
        });
        if (arr[0] && arr[0].method === "POST") {
          var bodyPara = JSON.stringify(arr[0]);
          var myRequest = new Request(baseCrawlerURL, {
            method: "POST",
            body: bodyPara,
            mode: "cors",
            headers: {
              "content-type": "application/json"
            }
          });
          window
            .fetch(myRequest)
            .then(response => response.json())
            .then(response => {
              // console.debug(response);
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
      // document.removeEventListener("click", handleInterceptClick);
    }
    // document.addEventListener("click", handleInterceptClick);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.el-button--success,
.el-button--primary,
.el-button--success:hover,
.el-button--success:visited {
  color: #fff;
  background-color: #ddd !important;
  border-color: #ccc !important;
}
.el-button--success.is-active,
.el-button--success:active {
  background-color: #ddd;
  border-color: #ccc;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
