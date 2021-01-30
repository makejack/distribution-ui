import router from '@/router'

import { GenerateMenu } from '@/router/aside'
import { GenerateRoutes } from '@/router/authroutes'


const state = {
    menu: undefined,
    routes: undefined,
    hasRoutes: false,
}

const mutations = {
    SET_ROUTES(state, data) {
        state.menu = data.aside
        state.routes = data.authRoutes
        state.hasRoutes = true
    }
}

const actions = {
    generate_routes({ commit }, role) {
        var aside = GenerateMenu(role);
        var authRoutes = GenerateRoutes(role)
        commit('SET_ROUTES', {
            aside,
            authRoutes
        })
        router.addRoutes(authRoutes);
    }
}

const getters = {
    menus: state => state.menu,
    hasRoutes: state => state.hasRoutes
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}