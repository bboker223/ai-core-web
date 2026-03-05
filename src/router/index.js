import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
Vue.use(VueRouter)

// 路由配置
const router = new Router({
    mode: 'hash', // 保持 hash 模式
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
        // [修改核心]：将 MainLayout 作为独立的工作台入口，不需要 children
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