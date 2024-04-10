import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => ({
    token: ""
  }),
  // 计算属性，有数据缓存
  getters: {},
  actions: {
    getToken() {
      this.token = localStorage.getItem("token") || "";
    }
  },
})
