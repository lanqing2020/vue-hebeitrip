import request from '@/request'

/**
 * 查询轮播图列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getBannerList() {
    return request.get("/pub/carousel/index", {})
}

/**
 * 查询热门标签列表
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getHotTagsList(data) {
    return request.post("/pub/travelDiary/queryDiaryList", data, {
        header: ""
    })
}
