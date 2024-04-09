import request from '@/request'

/**
 * 查询产品列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getProductList() {
    return request.get("/v1/pub/video/list", {})
}

/**
 * 查询产品详情
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getProductDetail(params) {
    return request.get("/v1/pub/video/find_detail_by_id?video_id=" + params)
}
