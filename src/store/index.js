import Vue from 'vue'
import Vuex from 'vuex'
import Public from './modules/public'
import Settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {},
  // actions,
  // getters,
  mutations: {},
  modules: {
    Public, Settings
  },
  strict: debug
})
