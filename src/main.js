import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGtm from 'vue-gtm'

Vue.use(VueGtm, {
  id: 'GTM-KZGN2B4',
  debug: process.env.NODE_ENV !== 'production',
  loadScript: true
})

Vue.config.productionTip = false

Vue.component('loading', () => import('@/components/Loading'))
Vue.component('vue-image', () => import('@/components/VueImage'))
Vue.component('vue-background-image', () => import('@/components/VueBackgroundImage'))
Vue.component('arrow-icon', () => import('@/components/ArrowIcon'))

const app = new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  mounted () {
    let current = this.$router.history.current
    this.$gtm.trackView(current.name, current.path)
  }
}).$mount('#app')

// GTM router
router.beforeEach((to, from, next) => {
  app.$gtm.trackView(to.name, to.path)
  next()
})
