import Router from 'koa-router';
import axios from './utils/axios'
import sign from './utils/sign'

let router = new Router({prefix: '/categroy'})


router.get('/crumbs',async (ctx)=>{

  let {status, data:{areas, types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params:{
      city:ctx.query.city.replace('市','') || "北京",
      sign
    }
  })
  ctx.body={
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})

export default router;
