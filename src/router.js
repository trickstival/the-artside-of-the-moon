import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/vr'
        },
        {
            path: '/vr',
            component: () => import('./pages/VRPage.vue')
        }
    ]
})

