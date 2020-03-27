import Vue from 'vue'
import Vuex from 'vuex'
import hospitals from './modules/hospitals'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['hospitals']
})

// reset when storage is more than 24 hours
const hours = 4
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
    hospitals
  },
  plugins: localPlugins
})
