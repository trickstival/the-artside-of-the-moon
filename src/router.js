import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('./pages/MainPage.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('./pages/PagerPage.vue')
                },
                {
                    path: '/artemis',
                    component: () => import('./pages/ArtemisPage.vue')
                }
            ]
        },
        {
            path: '/vr',
            component: () => import('./pages/VRPage.vue')
        }
    ]
})

