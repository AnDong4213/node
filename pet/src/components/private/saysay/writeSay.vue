<template>
  <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="4" style='background: yellow'>
          <navmenu />
        </el-col>
        <el-col :span="16" style='background: #eee'>
            <form name='sayform' ref="sayform">
                <table align='center' width='80%'>
                    <tr>
                        <td>
                            <el-input
                                name='content'
                                type="textarea"
                                :rows="2"
                                placeholder="写说说"
                                v-model="textarea">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <el-button type="success" @click='chooseImg' style="margin: 10px;">选择宠物照片</el-button>
                        <input 
                            v-for='petimg in petimgs' 
                            type='file' 
                            name='petimg' 
                            @change='choosed'
                            style="display: none;"
                            :key="petimg.key"
                            multiple
                        />
                        <br/>
                        <input 
                            type='file' 
                            name='petimg2' 
                            @change='choosed2'
                            multiple
                        />
                        <ul class="uldel">
                            <li v-for="(petphoto, index) in petphotos" :key="petphoto.key">
                                <img 
                                    :src='petphoto.src' 
                                    width='90'
                                    height="90"
                                />
                                <i></i>
                                <span @click.stop="del(index)" class="el-icon-delete"></span>
                                <span @click.stop="set('index')" class="el-icon-setting"></span>
                            </li>
                        </ul>
                        </td>
                    </tr>
                    <tr>
                        <td align='center'>
                            <el-button type="success" @click='pubSay'>提交</el-button>
                        </td>
                    </tr>
                </table>
            </form>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
  </el-row>
</template>

<script>
import { httpBinaryPost } from '@/common/httpBean'
import navmenu from '../navmenu';
let petImgN = 0;

export default {
  data () {
    return {
        petimgs:[{key: 'a'},{key: 'b'}],
        petphotos:[],
        textarea: '',
        fileObj: null
    }
  },
  methods: {
    chooseImg() {
        this.petimgs.push({key: petImgN});
        this.$refs.sayform.petimg[petImgN].click();
        petImgN++;
    },
    choosed2(e) {
        let files = e.currentTarget.files;
        this.fileObj = files;
    },
    choosed(e) {
        let files = e.currentTarget.files;
        let url = window.URL || window.webkitURL || window.mozURL, src;
        for (let i = 0,len = files.length;i < len; ++i) {
            let file =files[i];
            if (url) {
                src = url.createObjectURL(file);
            } else {
                src = e.target.result;
            };
            this.petphotos.push({src,key: petImgN + 'a'});
            petImgN++;
        }
    },
    pubSay() {
        let files = this.fileObj;
        for (let i = 0; i < files.length; i++) {
            let formObj = new FormData();
            formObj.append('petimg', files[i]);
            httpBinaryPost('/say/subSay', formObj, (res) => {
                if (res.result == 'ok') {
                    this.$message({
                        showClose: true,
                        message: '成功写说说...',
                        type: 'success'
                    });
                }
            })
        }
    },
    del(id) {
        /* let petphotos = JSON.parse(JSON.stringify(this.petphotos));
        let petimgs = JSON.parse(JSON.stringify(this.petimgs));
        let index = petimgs.findIndex(item => item.key == id);
        petphotos.splice(id, 1);
        petimgs.splice(index, 1);
        this.petphotos = petphotos;
        this.petimgs = petimgs; */
    },
    set(id) {
        console.log(id)
    }
  },
  components: {
      navmenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .uldel > li {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        margin-left: 10px;
    }
    .uldel > li:hover i {
       opacity: 1;
    }
    .uldel > li:hover span {
       display: inline-block;
       top: 34px;
    }
    .uldel > li i {
        background-color: rgba(0, 0, 0, 0.2);
        width: 90px;
        height: 90px;
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        opacity: 0;
    }
    .uldel > li span {
        position: absolute;
        color: #fff;
        font-size: 22px;
        z-index: 10;
        display: inline-block;
        display: none;
    }
    .uldel li span:nth-of-type(1) {
        transform: translateX(-30px);
    }
    .uldel > li span:last-child {
        transform: translateX(10px);
    }
    .uldel > li span:hover {
        cursor: pointer;
    }
</style>
