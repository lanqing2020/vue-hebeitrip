import request from '@/request'

/**
 * 查询用户信息
 * 关于 token： get请求直接加，post请求先写data，再写header
 * Get
 * axios.get('/api/data', {
 *     headers: {
 *         'Authorization': `Bearer ${token}`
 *     }
 * });
 * Post
 * axios.post('/api/data', {}, {
 *     headers: {
 *         'Authorization': `Bearer ${token}`
 *     }
 * });
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function findInfoByToken(token) {
    return request.get("/v1/pri/user/find_by_token", {
        params: {
            "token": token
        },
    })
}

/**
 * 查询用户浏览到的位置信息
 * @param token
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
// export function queryCurrPosition(token) {
//     return request.get("/v1/pri/user/find_curr_position_by_token", {
//         params: {
//             "token": token
//         },
//     })
// }

/**
 * 用户登录
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param phone
 * @param pwd
 */
export function doLogin(data) {
    return request.post("/pri/user/login", data)
}

/**
 * 用户注册
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function doRegister(data) {
    return request.post("/v1/pri/user/register", data)
}

/**
 * 获取用户全部积分以及消耗
 * @param token
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getTotalIntegral(token, data) {
    return request.post("/v1/pri/user/getTotalIntegral", data, {
        headers: {
            "token": token
        }
    })
}

/**
 * 获取用户积分明细记录
 * @param token
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getIntegralIncomeRecord(token, data) {
    return request.post("/v1/pri/user/getIntegralIncomeRecord", data, {
        headers: {
            "token": token
        }
    })
}

/**
 * 获取积分兑换支出记录
 * @param token
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getIntegralConsumeRecord(token, data) {
    return request.post("/v1/pri/user/getIntegralConsumeRecord", data, {
        headers: {
            "token": token
        }
    })
}
