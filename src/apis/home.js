import request from '@/request'

export function getListBanner() {
    return request.get("/v1/pub/product/list_banner", {})
}