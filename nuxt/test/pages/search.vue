<template>
  <div class="page">
    Page is HHH
    <ul>
      <li v-for="(item, idx) in $store.state.city.list" :key="idx">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'search',
  data() {
    return {
      list: []
    }
  },
  /* async mounted() {
    let { status, data: {list, name} } = await axios.get('/city/list');
    if (status == 200) {
      this.list = list
    }
  }, */
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    let { status, data: {list, name} } = await axios.get('http://localhost:3000/city/list');
    if (status == 200) {
      return {
        list
      }
    }
  },
  async fetch(context) {
    // console.log(context)
  }

}
</script>