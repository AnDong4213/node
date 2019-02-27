<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
      @select="handleSelect2"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value" 
      />
    </el-select>
    <span style="display: inline-block;margin:0px 10px 0px 20px;" class="name">直接搜索 :</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data() {
    return {
      province: [],
      city: [],
      pvalue: '',
      cvalue: '',
      input: '',
      cities:[]
    }
  },
  watch: {
    pvalue: async function(newPvalue, oldPvalue) {
      // console.log(newPvalue, oldPvalue);
      let { status, data:{city} }=await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map(item => {
          return {
            value:item.id,
            label:item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  mounted: async function() {
    let {status, data: {province}} = await this.$axios.get('/geo/province');
    if (status === 200) {
      this.province = province.map(item => {
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      // console.log(this.cities)
      if (this.cities.length) {
        cb(this.cities.filter(item => item.value.includes(query)))
      } else {
        let {status, data: {city}} = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map(item => {
            return {
              value: item.name
          }})
          // cb(self.cities.filter(item => item.value.indexOf(query)>-1))
          cb(this.cities.filter(item => item.value.includes(query)))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect(item) {
      console.log(item.value)
    },
    handleSelect2(item) {
      // console.log(item) // 120000
    }
  },
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>





