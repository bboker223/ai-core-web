import axios from 'axios';
import store from '@/store'; // 假设你已使用Vuex store
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
        // 排除
        if ( config.headers['Content-Type'] === 'multipart/form-data') {
            return config;
        }
        // 只有POST请求且有数据时才加密
        if (config.method === 'post') {
            config.headers['Content-Type'] = 'application/json';

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// 响应拦截器 解密
instance.interceptors.response.use(
    response => {
        // 如果异常，没有加密直接返回
        if( response.data.jcode !== 200){
            return response.data.payload
        }

        return response;
    },
    error => {
        if (error.response && (error.response.status === 400 ||  error.response.status === 401 || error.response.status === 500)) {
            // token过期或无效，跳转到登录页
            localStorage.removeItem('token');
            store.commit('setApiSecretKey', '');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);


export default httpConfig;
