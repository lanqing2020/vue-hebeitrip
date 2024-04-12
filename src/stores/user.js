import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => ({
    token: "",
    hasLogged: false,
    errorTimes: 0,
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
    },

    /**
     * 获取操作错误次数
     * @returns {any}
     */
    getErrorTimes() {
      this.errorTimes = JSON.parse(localStorage.getItem("errorTimes") || 0);
      return this.errorTimes;
    },

    /**
     * 设置操作错误次数
     * @param num
     */
    setErrorTimes(num) {
      localStorage.setItem("errorTimes", num);
      this.errorTimes = num;
    }

  },
})
