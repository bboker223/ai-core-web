import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../components/MainLayout.vue'

Vue.use(VueRouter)

// 路由配置
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        component: MainLayout,
        redirect: '/portal',
        children: [
            {
                path: 'portal',
                name: 'AIPortal',
                component: () => import('../views/AIPortal.vue'),
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFoundPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})



// 基础路由防线：隔离未登录访问
// router.beforeEach((to, from, next) => {
//     // 临时使用 localStorage 模拟 Token，后续替换为 Vuex 状态
//     const isAuthenticated = localStorage.getItem('bamo_token');
//     if (to.name !== 'Login' && !isAuthenticated) {
//         next({ name: 'Login' })
//     } else {
//         next()
//     }
// })

export default router;