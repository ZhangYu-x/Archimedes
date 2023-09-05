const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false, // 取消eslint校验
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css$|\.woff$|\.woff2$|\.jpg$|\.png$|\.svg/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    // proxy: 'http://localhost:8888/'
    historyApiFallback: true,
    proxy: {  //配置跨域
      '/thegraph': {
        target: 'https://q.hg.network/subgraphs/name/jacka/heco',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/thegraph': ''
        }
      },
      '/heco': {
        target: 'https://q.hg.network/subgraphs/name/acmd/heco',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/heco': ''
        }
      },

    }
  },
}
