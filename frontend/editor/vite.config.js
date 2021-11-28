import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import monacoEditorPlugin from "vite-plugin-monaco-editor"
export default defineConfig({ // 服务
  server: { // 服务器主机名
    host: '0.0.0.0', // 端口号
    port: 3000,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下移一格端口
    strictPort: false,
    //http.createServer() 配置项
    // https: '',
    proxy: {
      '/api': {
        target: 'http://111.1.1.1',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '')
        }
      }
    }, // 开发服务器配置 CORS // boolean | CorsOptions
    cors: true || {},
    // 设置为 true 强制使依赖构建 //
    //force: true,
    // 禁用或配置HMR连接
    //hmr: {},
    // 传递给 chokidar 的文件系统监视器选项
    //watch: {}
  },
  // 项目根目录
  // root: process.cwd(),
  root: './src/',
  // 项目部署的基础路径
  base: './',
  // 环境配置
  //mode: 'production',
  // 全局变量替换 Record<string, string>
  define: {},
  // 插件
  plugins: [vue(),monacoEditorPlugin()],
  // 静态资源服务文件夹
  publicDir: 'public',
  resolve: {
    alias: {
      //'@': path.resolve(__dirname, 'src'),
      'vue': 'vue/dist/vue.esm-bundler.js',// 定义vue的别名，如果使用其他的插件，可能会用到别名
      'components': path.resolve(__dirname, 'src/components')
    },
    dedupe: [],
    // 情景导出package.json 配置中的 exports 字段
    conditions: [],
    // 解析package.json 中的字段 mainFields: ['module', 'jsnext:main', 'jsnext'],

    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: { // 配置css modules 的行为， 选项被传递给postcss-modules modules: {},
    // PostCSS 配置（格式同postcss.config.js）
    // postcss-load-config 的插件配置
    postcss: {},
    // 指定传递给 CSS 预处理器的选项
    preprocessorOptions: {}
  },
  json: {
    // 是否支持从 .json 文件中进行按名导入
    //namedExports: true,
    // 若设置为 true, 导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好
    // 尤其是当 JSON 文件较大时
    // 开启此项， 则会禁用按名导入
    stringify: true
  },
  // 继承自 esbuild 转换选项， 最常见的用例是自定义 JSX
  esbuild: {
    //jsxFactory: 'h',
    //jsxFragment: 'Fragment',
    //jsxInject: `import React from 'react'`
  },
  // 静态资源处理 字符串 || 正则表达式
  //assetsInclude: '',
  // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  logLevel: 'info',
  // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
  //clearScreen: true,
  build: {
  // 浏览器兼容性 ‘esnext’ | 'modules'
  target: 'modules',
  //输出路径
  outDir: '../dist',
  // 生成静态资源的存放路径
  assetsDir: '../assets',
  // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的http请求， 设置为 0, 可以完全禁用此项，
  assetsInlineLimit: 4096,
  // 启动 / 禁用 CSS 代码拆分
  cssCodeSplit: true,
  // 构建后是否生成 soutrce map 文件
  sourcemap: false,
  // 自定义底层的 Rollup 打包配置
  rollupOptions: {
    input: {
      //admin: path.resolve(__dirname, 'src/index.html'),
      //page: path.resolve(__dirname, 'src/page/index.html'),
      index: path.resolve(__dirname, 'src/index.html'),
    },
    output: {
      chunkFileNames: 'assets/[name]-[hash].js',
      entryFileNames: 'assets/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash].[ext]',
    }
  },
  // @rollup/plugin-commonjs 插件的选项
  commonjsOptions: {},
  // 构建的库
  // lib: { entry: string, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string },
  // 当设置为 true, 构建后将会生成 manifest.json 文件
  manifest: false,
  // 设置为 false 可以禁用最小化混淆
  // 或是用来指定是应用哪种混淆器
  // boolean | 'terser' | 'esbuild'
  minify: 'terser',
  // 传递给 Terser 的更多 minify 选项
  terserOptions: {},
  // 设置为false 来禁用将构建好的文件写入磁盘
  write: true,
  // 默认情况下 若 outDir 在 root 目录下， 则 Vite 会在构建时清空该目录。 emptyOutDir: true,
  // 启用 / 禁用 brotli 压缩大小报告 brotliSize: false,
  // chunk 大小警告的限制
  chunkSizeWarningLimit: 500
}
})