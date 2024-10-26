import { showToast } from 'vant';

/**
 * 请求拦截器，在发送请求前拦截，需要统一把token信息，放入每个请求的请求头？
 * @param config
 * @returns {*}
 */
export function reqInterceptor(config) {
    // config.headers['Authorization'] = localStorage.getItem('token');
    config.headers["Content-type"] = "application/json";
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config;
}

/**
 * 响应拦截器，对响应数据做点什么
 * @param response
 * @returns {*}
 */
export function resInterceptor(response) {
    const { code, msg } = response.data;
    if(!response.config.silent){
        if (code !== 0) {
            showToast(msg);
        }
    }

    // TODO
    // if (code !== 0) {
    //     // 对于pri路径下的私有接口，进行登录过期的判断，然后跳转去登录页
    //     // // 判断是登录页还是注册页，如果是注册页报错，还停留在注册页。订单页和登录页和用户中心页，都跳到登录页
    //     const url = response.config.url;
    //     let path = "";
    //     if (url.indexOf("/register") !== -1) {
    //         path = "/register";
    //     } else if (url.indexOf("/save") !== -1) {
    //         path = "/";
    //     } else {
    //         path = "/login";
    //     }
    //     // if (url.indexOf("/pri") !== -1) {
    //     //     showDialog({
    //     //         title: '提示',
    //     //         message: msg,
    //     //     }).then(() => {
    //     //         if (url.indexOf("/login") !== -1 || url.indexOf("/register") !== -1) {
    //     //             useUserStore().setLogged(false);
    //     //             const errorTimes = useUserStore().getErrorTimes();
    //     //             useUserStore().setErrorTimes(errorTimes + 1);
    //     //             router.push({
    //     //                 path: path,
    //     //                 query: {
    //     //                     errorTimes: errorTimes + 1
    //     //                 }
    //     //             });
    //     //         } else {
    //     //             router.push({
    //     //                 path: path,
    //     //                 query: {}
    //     //             });
    //     //         }
    //     //     })
    //     // } else {
    //     //     showToast(msg)
    //     // }
    // }

    return response.data;
}

/**
 * 请求失败拦截器
 * @param error
 * @returns {Promise<never>}
 */
export function errInterceptor(error) {
    // try {
    //     // 请求头中silent为true时 不提示错误信息
    //     if (!error.config.silent) {
    //         if (error.response.data.msg) {
    //             Toast(error.response.data.msg)
    //         }
    //     }
    //     if (error.response.status === 401) {
    //         bridge.loginOut()
    //     }
    // } catch (error) {
    //     // empty
    // }
    return Promise.reject(error)
}
