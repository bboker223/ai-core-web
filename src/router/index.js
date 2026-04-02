import Vue from 'vue'
import Router from 'vue-router'
//  api 配置文件
import apiConfig from '@/ser/api.js'
import httpConfig from '@/ser/index.js'

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



// 基础路由防线：隔离未登录访问 加锁防止在重定向过程中重复调用
let isSsoLoggingIn = false;
// 基础路由防线：隔离未登录访问 + SSO 静默拦截
router.beforeEach(async (to, from, next) => {
    // 兼容取值
    const ssoUserId = to.query.userid || to.query.userId;
    const currentToken = localStorage.getItem('bamo_token');
    // 获取当前已登录的 userId
    const currentUserId = localStorage.getItem('bamo_userId');
    // ================= 1. SSO 免密登录及串号拦截 =================
    if (ssoUserId && !isSsoLoggingIn) {
        // 如果没有 Token，或者传来的 userId 和当前登录的不同 -> 触发 SSO
        if (!currentToken || currentUserId !== ssoUserId) {
            isSsoLoggingIn = true;
            try {
                let url = apiConfig.baseUrl + '/api/portal/ssoLogin';
                const res = await httpConfig.post(url, { userId: ssoUserId });

                if (res.data && res.data.code === 200) {
                    const { token, userId, userName } = res.data.data;
                    // 重新写入，覆盖掉之前账号 A 的信息
                    localStorage.setItem('bamo_token', token);
                    localStorage.setItem('bamo_userId', userId);
                    localStorage.setItem('bamo_userName', userName);
                    // 抹除 URL 参数
                    const query = { ...to.query };
                    delete query.userid;
                    delete query.userId;
                    isSsoLoggingIn = false;
                    return next({ path: to.path, query: query, replace: true });
                } else {
                    // 如果后端发现传来的新 userId 是假的/过期的，为了安全，必须把原来的登录态也清空，踢回登录页
                    localStorage.removeItem('bamo_token');
                    localStorage.removeItem('bamo_userId');
                    localStorage.removeItem('bamo_userName');
                    isSsoLoggingIn = false;
                    return next('/login');
                }
            } catch (error) {
                console.error('SSO 切换账号验证失败:', error);
                localStorage.removeItem('bamo_token');
                isSsoLoggingIn = false;
                return next('/login');
            }
        } else {
            // 如果传过来的 userId 和当前登录的一模一样,不需要重新调后端接口，直接把 URL 擦干净放行就行
            const query = { ...to.query };
            delete query.userid;
            delete query.userId;
            return next({ path: to.path, query: query, replace: true });
        }
    }

    // ================= 2. 常规权限校验 =================
    if (to.name !== 'Login' && !localStorage.getItem('bamo_token')) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router;