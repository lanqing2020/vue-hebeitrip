import request from '@/request'

/**
 * 根据不同type 获取用户的不同订单
 * @param token
 * @param method
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getListOrder(token, method) {
    return request.get("/v1/pri/order/list_order", {
        params: { method, token }
    })
}

/**
 * 下单接口
 * @param token
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function saveOrder(token, data) {
    return request.post("/v1/pri/order/save", data, {
        headers: {
            "token": token
        }
    })
}
