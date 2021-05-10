module.exports = {
    devServer: {
        open: true,
        // host:"localhost",
        port: 8085, // 端口
        // https:false,
        // hot:true //模块不支持热更新的情况下自动刷新页面
        // headers:{
        //     'Access-Control-Allow-Origin':'*'
        // },
        // hotOnly:false,
        // disabledHostCheck: true,
    },
    lintOnSave: false, // 取消 eslint 验证
   
    // proxy: {
        //             '/api': {
        //                 target: 'http://192.168.5.184:9801',//服务器api地址
        //                 changeOrigin: true,
        //                 ws: true,
        //                 pathRewrite: {
        //                     '^/api': '/api'
        //                 }
        //             }
        //         }
}