import request from '@/request'

/**
 * 查询轮播图列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getBannerList() {
    return request.get("/v1/pub/video/list_banner", {})
}

/**
 * 查询产品列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getProductList() {
    return request.get("/v1/pub/video/list", {})
}

/**
 * 查询热门标签列表
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getHotTagsList() {
    return request.get("/v1/pub/video/getHotTagsList", {})
}
