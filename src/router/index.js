import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/portal',
            name: 'Portal',
            component: () => import('@/components/MainLayout.vue')
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import('@/views/NotFoundPage.vue')
        }
    ]
});



// 基础路由防线：隔离未登录访问
router.beforeEach((to, from, next) => {
    // 临时使用 localStorage 模拟 Token，后续替换为 Vuex 状态
    const isAuthenticated = localStorage.getItem('bamo_token');
    if (to.name !== 'Login' && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router;