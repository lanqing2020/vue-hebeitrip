import Vant from 'vant'
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import 'amfe-flexible'
import App from './App.vue'
import router from './router'

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Vant)
// 注册时可以配置额外的选项
app.use(Lazyload, {
    lazyComponent: true,
});

app.mount('#app')
