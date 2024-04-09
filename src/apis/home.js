import request from '@/request'

/**
 * 查询轮播图列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getListBanner() {
    return request.get("/v1/pub/video/list_banner", {})
}