import Vant from 'vant'
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'amfe-flexible'

import App from './App.vue'
import router from './router'

import Axios from 'axios'
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vant)
// 注册时可以配置额外的选项
app.use(Lazyload, {
    lazyComponent: true,
});

app.mount('#app')