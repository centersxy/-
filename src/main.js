// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swipe from 'base/swipe/swipe'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import backScroll from 'base/back-top/back-top'

Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.use(VueLazyLoad, {
  loading: require('./assets/loading-spin.svg')
})
Vue.component(swipe.name, swipe)
Vue.component(backScroll.name, backScroll)

Vue.config.productionTip = false
const store = new Vuex.Store({
  state: {
    num: 1,
    circleFlag: false,
    theme: {}
  },
  mutations: {
    updateSlide: (state, id) => state.num = id,
    // go-back
    toggle (state, n) {
      if (n) {
        state.circleFlag = true
      } else {
        state.circleFlag = false
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
