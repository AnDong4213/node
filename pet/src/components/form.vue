<template>
  <div class="hello">
    <el-button @click="form" type='primary'>提交Form</el-button>
    <el-progress type="circle" :percentage="percent" color="#8e71c7"></el-progress>
    <form name="advForm">
			<input type="text" name="advName"  value="韩国">
			<input type="file" name="petfile" @change="upload" />
			<input type="file" name="petimg" @change="uploadimg" />
			<select name="advType">
				<option value="1">轮播图</option>
				<option value="2" selected>轮播图底部广告</option>
				<option value="3">热门回收广告</option>
				<option value="4">优品精选广告</option>
			</select>
			<textarea name="item" id="" cols="30" rows="10"></textarea>
		</form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      percent: 0
    }
  },
  created() {
    
  },
  methods: {
    upload(e) {
      // console.log(e.currentTarget.files[0])
    },
		uploadimg(e) {
			// console.log(e.currentTarget.files[0])
		},
    form() {
      let that = this;
      var formData = new FormData(advForm);
      formData.append("username", "Groucho");
			formData.append("accountnum", 123456);  //数字123456会被立即转换成字符串 "123456"

			var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
			var blob = new Blob([content], { type: "text/xml"});
			formData.append("webmasterfile", blob);
			
      let xhr = new XMLHttpRequest();
      xhr.timeout = 3000;
			xhr.responseType = 'json';

			xhr.open('POST', '/api/other/form', true);

      xhr.onprogress = function(e) {
				console.log('onprogress');
				if (e.lengthComputable) {
					var completedPercent = e.loaded / e.total;
					console.log(completedPercent)
				}
			}

			xhr.onload = function(e) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					console.log(this.response);
				}
			};
			xhr.upload.onprogress = function (e) {
				if (e.lengthComputable) {
					var completedPercent = (e.loaded / e.total) * 100;
          that.percent = Number(completedPercent.toFixed(2));
				}
			};

			xhr.upload.onerror = function(e) {
				console.log(e)
			}

			xhr.onerror = function(e) {
				console.log(e)
			}

			xhr.send(formData);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
