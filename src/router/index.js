import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由配置
const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/login' // 重定向到默认路由
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        // 为需要布局的页面添加统一布局
        {
            path: '',
            component: () => import('@/components/MainLayout'), // 布局组件
            children: [ // 所有需要布局的页面路由
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('@/views/Profile.vue'),
                    meta: { title: '个人中心' }
                }
            ]
        },

        // 404 页面，捕获所有未匹配的路由，必须放在最后
        {
            path: '*',
            name: 'NotFound',
            component: () => import('@/views/NotFoundPage.vue')
        }
    ]
});

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('token');
//     // 定义不需要认证的页面白名单
//     // 定义不需要认证的页面白名单
//     const publicPages = ['/login', '/register', '/reg', '/banned', '/', '/order', '/user'];
//     // 定义可以访问但需要认证的页面白名单
//     const authRequired = !publicPages.includes(to.path);
//
//
//     if (authRequired && !token) {
//         // 如果需要认证但没有token，则重定向到登录页
//         next('/login');
//     } else {
//         // 否则，正常进行
//         next();
//     }
// });

export default router;