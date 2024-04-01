import request from '@/request'

export function lllll() {
    return request.get("/v1/pub/video/list_banner", { })
}