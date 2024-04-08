import axios from 'axios';
import { Toast } from 'vant';

let config = {
    baseURL: "http://localhost:8081/api",
    timeout: 5000
}

const instance = axios.create({...config});
instance.interceptors.request.use(requestSuccessInterceptor, requestErrorInterceptor);
instance.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

/**
 * 请求拦截器，在发送请求前拦截
 * @param config
 * @returns {*}
 */
export function requestSuccessInterceptor(config) {
    console.log("请求前成功", config)
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
    console.log("响应成功", response)
    const { code, data, msg } = response;
    if (code !== 0) {
        // Toast(msg)
    }
    return data;
}

/**
 * 对响应错误做什么
 * @param error
 * @returns {Promise<never>}
 */
export function responseErrorInterceptor(error) {
    console.log("响应失败", error)
    return Promise.reject(error);
}

export default instance;