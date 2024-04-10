import request from '@/request'

/**
 * 查询用户信息
 * 关于 token： get请求直接加，post请求先写data，再写header
 * Get
 * axios.get('/api/data', {
 *     headers: {
 *         'Authorization': `Bearer ${token}`
 *     }
 * });
 * Post
 * axios.post('/api/data', {}, {
 *     headers: {
 *         'Authorization': `Bearer ${token}`
 *     }
 * });
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function findInfoByToken() {
    return request.get("/v1/pri/user/find_by_token", {
        params: {
            "token": "xdclasseyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4ZGNsYXNzIiwiaGVhZF9pbWciOiJodHRwczovL3hkLXZpZGVvLXBjLWltZy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20veGRjbGFzc19wcm8vZGVmYXVsdC9oZWFkX2ltZy8xMi5qcGVnIiwiaWQiOjE0LCJuYW1lIjoi5bCP5ru0dHQiLCJpYXQiOjE3MTI3MzUzMDMsImV4cCI6MTcxMzM0MDEwM30.LdPtR8qiiGfYLljrtt4ifrGV9-ZUYBaikn5aE6kDc60"
        },
    })
}