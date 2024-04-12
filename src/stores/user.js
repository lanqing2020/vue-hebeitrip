import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => ({
    token: "",
    hasLogged: false,
  }),
  // 计算属性，有数据缓存
  getters: {},
  actions: {

    /**
     * 任意页面获取token
     * @returns {*|string|string}
     */
    getToken() {
      this.token = localStorage.getItem("token") || "";
      return this.token;
    },

    /**
     * 任意页面设置token
     * @param str
     */
    setToken(str) {
      localStorage.setItem("token", str);
      this.token = str;
    },

    /**
     * 获取登录状态
     * @returns {*}
     */
    getLogged() {
      this.hasLogged = JSON.parse(localStorage.getItem("hasLogged"));
      return this.hasLogged;
    },

    /**
     * 设置登录状态
     * @param bool
     */
    setLogged(bool) {
      localStorage.setItem("hasLogged", bool);
      this.hasLogged = bool;
    }

  },
})
