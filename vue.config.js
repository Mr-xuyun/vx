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
        productionSourceMap: false
}