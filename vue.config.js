const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint （代码校验）
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': {
                target:'http://gmall-h5-api.atguigu.cn'
                //target: 'http://39.98.123.211:8510',

            }
        }
    }
})