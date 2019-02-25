import Router from 'koa-router';
import axios from './utils/axios'

let router = new Router({
  prefix: '/geo'
})

const sign = '12c41576b37c6c65390c45e62ed606ee'

router.get('/getPosition', async (ctx) => {
  let { status, data: {province, city} } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  let {status, data: {
      menu
    }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/province', async (ctx) => {
  let {status, data: {
      province
    }} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200
      ? province
      : []
  }
})

router.get('/province/:id', async (ctx) => {
  console.log(ctx.params)
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async (ctx) => {
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => {
  let {status, data: {
      hots
    }} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

export default router
