import axios from 'axios';
import { showToast } from 'vant';

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
    console.log("请求前的config", config)
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // 私有接口进行登录限制
    if (config.url.indexOf("/pri") !== -1) {
        // const token = localStorage.getItem("token");
        // if (token) {
        //
        //     config.headers['token'] = token;
        // }
    }
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
    console.log("响应成功", response)
    const { code, msg } = response.data;
    if (code !== 0) {
        showToast(msg)
    }
    return response.data;
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