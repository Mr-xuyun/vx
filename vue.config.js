module.exports={
   publicPath:"./",
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        noInfo: true,
        port:80,
     },
     configureWebpack: {
      externals: {
          vue: "Vue",
          'vue-router': 'VueRouter',
          axios: 'axios',
          vuex: "Vuex",
          vant: "vant",
          echarts:"echarts",
          mint:"mint",
          moment:"moment",
          less:"less",
      }
  },
        productionSourceMap: false,
        // chainWebpack: config => {
        //     config.module
        //       .rule('images')
        //       .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        //       .use('image-webpack-loader')
        //         .loader('image-webpack-loader')
        //         .options({
        //           bypassOnDebug: true
        //         })
        //         .end()
        //   },
        
}