import request from '@/request'

/**
 * 获取用户的订单列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param token
 */
export function getListOrder(token) {
    return request.get("/v1/pri/order/list_order", {
        params: {
            "token": token
        }
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