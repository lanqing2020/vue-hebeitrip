import axios from 'axios';
import { showDialog, showToast } from 'vant';
import router from "@/router/index.js";
import { useUserStore } from '@/stores';

let config = {
    // baseURL: "http://localhost:8080/api",
    baseURL: import.meta.env.VITE_BASIC_API,
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
        // // 判断是登录页还是注册页，如果是注册页报错，还停留在注册页。订单页和登录页和用户中心页，都跳到登录页
        const url = response.config.url;
        let path = "";
        if (url.indexOf("/register") !== -1) {
            path = "/register";
        } else if (url.indexOf("/save") !== -1) {
            path = "/index";
        } else {
            path = "/login";
        }
        if (url.indexOf("/pri") !== -1) {
            showDialog({
                title: '提示',
                message: msg,
            }).then(() => {
                if (url.indexOf("/login") !== -1 || url.indexOf("/register") !== -1) {
                    useUserStore().setLogged(false);
                    const errorTimes = useUserStore().getErrorTimes();
                    useUserStore().setErrorTimes(errorTimes + 1);
                    router.push({
                        path: path,
                        query: {
                            errorTimes: errorTimes + 1
                        }
                    });
                } else {
                    router.push({
                        path: path,
                        query: {}
                    });
                }
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