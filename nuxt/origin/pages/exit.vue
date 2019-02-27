<template>
  <div class="exit"></div>
</template>

<script>
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    // console.log(ctx)  // ctx是nuxt的一个实例...
    let { status, data } = await ctx.$axios.get('/users/exit');
    if (status === 200 && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
