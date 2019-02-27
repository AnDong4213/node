<template>
  <div class="slide">
    <el-carousel height="240px">
      <el-carousel-item 
        v-for="item in list" 
        :key="item.img">
        <img :src="item.img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [{
        url: '#abc',
        img: '/img/1.png'
      }, {
        url: '#bsbsb',
        img: '/img/1.jpg'
      }, {
        url: '#sjfkajfj',
        img: '/img/2.jpg'
      }, {
        url: '#sjfkajfja',
        img: '/img/3.jpg'
      }, {
        url: '#kjljj',
        img: '/img/4.jpg'
      }]
    }
  }
}
</script>
