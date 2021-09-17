import Vue from 'vue'
import Router from 'vue-router'
import msg from '@/components/msg'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/msg"
    },{
      path: '/msg',
      component:msg
    }
  ]
})
