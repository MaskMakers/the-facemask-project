import Vue from 'vue'
import Vuex from 'vuex'
import tabletop from './modules/tabletop'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['tabletop']
})

// reset when storage is older than a half hour
const hours = 0.5
const now = new Date().getTime()
const setupTime = localStorage.getItem('setupTime')
if (setupTime == null) {
  localStorage.setItem('setupTime', now)
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    window.localStorage.removeItem('vuex')
    localStorage.setItem('setupTime', now)
  }
}

// only add vuex local on production
let localPlugins = []
if (process.env.NODE_ENV === 'production') localPlugins.push(vuexLocal.plugin)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tabletop
  },
  plugins: localPlugins
})
