import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Classify from '@/components/Classify'
import Goods from '@/components/Goods'
import Order from '@/components/Order'
import Pay from '@/components/Pay'
import Buy from '@/components/Buy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
     {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
     {
      path: '/buy',
      name: 'buy',
      component: Buy
    }
  ]
})
