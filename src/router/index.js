import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MakeMask from '../views/MakeMask.vue'
import MaskDetail from '../views/MaskDetail.vue'
import SendMask from '../views/SendMask.vue'
// import HospitalInput from '../views/HospitalInput.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/make-a-mask',
    name: 'MakeMask',
    component: MakeMask
  },
  {
    path: '/mask/:maskId',
    name: 'MaskDetail',
    component: MaskDetail
  },
  {
    path: '/send-a-mask',
    name: 'SendMask',
    component: SendMask
  }
  // {
  //   path: '/hospital-input',
  //   name: 'HospitalInput',
  //   component: HospitalInput
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
