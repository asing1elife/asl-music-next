const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入样式文件，该语句在项目编译时会被动态插入到每个 vue 文件 <style> 节点中
        // 需要 node-sass 5.x 以及 sass-loader 10.x
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    before (app) {
      registerRouter(app)
    }
  }
}
