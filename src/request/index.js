import axios from 'axios';
import { showDialog, showToast } from 'vant';
import router from "@/router/index.js";
import { useUserStore } from '@/stores';

let config = {
    baseURL: "http://localhost:8081/api",
    timeout: 5000,
}

const instance = axios.create({...config});
instance.interceptors.request.use(requestSuccessInterceptor, requestErrorInterceptor);
instance.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

/**
 * 请求拦截器，在发送请求前拦截，需要统一把token信息，放入每个请求的请求头？
 * @param config
 * @returns {*}
 */
export function requestSuccessInterceptor(config) {
    // 私有接口限制
    if (config.url.indexOf("/pri") !== -1) { }
    // 公开接口放开
    return config;
}

/**
 * 对请求错误做什么
 * @param error
 * @returns {Promise<never>}
 */
export function requestErrorInterceptor(error) {
    console.log("请求前失败", error)
    return Promise.reject(error);
}

/**
 * 响应拦截器，对响应数据做点什么
 * @param response
 * @returns {*}
 */
export function responseSuccessInterceptor(response) {
    const { code, msg } = response.data;
    if (code !== 0) {
        // 对于pri路径下的私有接口，进行登录过期的判断，然后跳转去登录页
        if (response.config.url.indexOf("/pri") !== -1) {
            useUserStore().setLogged(false);
            showDialog({
                title: '提示',
                message: msg,
            }).then(() => {
                router.push({
                    path: "/login",
                    query: { }
                });
            })
        } else {
            showToast(msg)
        }
    }
    return response.data;
}

/**
 * 对响应错误做什么
 * @param error
 * @returns {Promise<never>}
 */
export function responseErrorInterceptor(error) {
    return Promise.reject(error);
}

export default instance;