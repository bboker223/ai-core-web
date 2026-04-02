import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true;

// 创建实例时设置配置的默认值
let instance = axios.create({
    timeout: 1000 * 3600,   // 全局等待时间1800s
    withCredentials: true
});


let httpConfig = {
    get: (url, params = null) => {
        return instance.request({
            url: `${url}`,
            method: 'get',
            params: params
        });
    },

    post: (url, params = null, responseType = null, progressEvent = null) => {
        return instance.request({
            url: `${url}`,
            responseType,
            method: 'post',
            data: params,
            onUploadProgress: progressEvent
        });
    },

}

/**
 * 请求拦截器 加密，加token
 */
instance.interceptors.request.use(
    config => {
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            return config;
        }
        if (config.method === 'post') {
            config.headers['Content-Type'] = 'application/json';
        }
        // 【新增】自动从 localStorage 提取 Token 并放入请求头
        const token = localStorage.getItem('bamo_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response && [400, 401, 500].includes(error.response.status)) {
            localStorage.removeItem('bamo_token');
            localStorage.removeItem('bamo_userId');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default httpConfig;
