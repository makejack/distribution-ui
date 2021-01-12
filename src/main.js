import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'

Vue.use(ElementUI)

Vue.prototype.$moment = moment
Vue.config.productionTip = false

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  var token = store.getters['user/token']
  if (token) {
    if (to.path === '/login') {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
