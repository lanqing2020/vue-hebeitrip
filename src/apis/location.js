import request from '@/request';

/**
 * 查询目的地的对应轮播图
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getLocationBannerList() {
    return request.post("/v1/pub/location/getLocationBannerList", {})
}

/**
 * 查询目的地的基本描述信息
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getLocationBasicInfo() {
    return request.post("/v1/pub/location/getLocationBasicInfo", {})
}

/**
 * 获取目的地门票列表
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getLocationTicketsList() {
    return request.post("/v1/pub/location/getLocationTicketsList", {})
}
