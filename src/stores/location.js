import { defineStore } from 'pinia'

export default defineStore('location', {
    state: () => ({
        // 用来存储 冀南 冀中 冀北 冀东 的不同数据
        locationPartsList: {},
    }),
    // 计算属性，有数据缓存
    getters: {},
    actions: {

        /**
         * 通过该方法更新list
         * @param data
         */
        updatePartsList(data) {
            this.locationPartsList = data;
        },
    },
})
