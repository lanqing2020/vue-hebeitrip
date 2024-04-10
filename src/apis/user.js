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
export function queryCurrPosition(token) {
    return request.get("/v1/pri/user/find_curr_position_by_token", {
        params: {
            "token": token
        },
    })
}