import { fileURLToPath, URL } from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取当前环境的配置
  const config = loadEnv(mode, './')
  return {
    // 需要用到的插件数组，vue和vuejsx
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      // resolve.alias属性配置文件自定义路径。设置@代表./src
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 开发服务器配置
    server: {
      // host指定服务器应该监听哪个ip地址。true监听所有地址
      // host: true,
      // 开发服务器端口配置。
      // port: '8081',
      // open：项目运行完毕是否自动打开，这项没用
      // open: true,
      // 是否使用https
      // https: true,
      // 就这项有用
      proxy: {
        "/api": {
          // target: "http://127.0.0.1:8081/",
          target: config.VITE_BASIC_API,
          changeOrigin: true,  // 开启跨域
          rewrite: path => path.replace(/^\/api/, "") // 去除前缀api
        }
      },
      cors: true
    },
    // 打包构建
    // build: {
    //   // 打包输出的文件夹名称
    //   outDir: 'dist',
    //   // 静态资源文件保存的文件夹名称
    //   assetsDir: 'assets',
    //   // 是否启用css代码拆分
    //   // cssCodeSplit: true,
    //   // 打包构建后是否生成 source map 文件。
    //   sourcemap: false,
    //   // 打包构件时压缩混淆
    //   // minify: 'esbuild',
    //   terserOptions: {
    //     compress: {
    //       drop_console: true,
    //       drop_debugger: true,
    //     }
    //   }
    // }
  }

})
