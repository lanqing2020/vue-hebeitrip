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
