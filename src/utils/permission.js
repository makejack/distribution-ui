import router from '../router'
import store from '../store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/forget']

router.beforeEach((to, from, next) => {
    NProgress.start()

    var token = store.getters['user/token']
    if (token) {
        if (whiteList.indexOf(to.path) !== -1) {
            return next({ path: '/' })
        }
    } else {
        if (whiteList.indexOf(to.path) === -1) {
            return next({ name: 'Login' })
        }
    }

    next()
})

router.onReady(() => {
    var hasRoutes = store.getters['permission/hasRoutes']
    if (!hasRoutes) {
        var user = store.getters['user/userInfo']
        if (user) {
            store.dispatch('permission/generate_routes', user.role)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
