const target = 'http://localhost:5000/'

module.exports = {
    devServer: {
        proxy: {
            'upload': {
                target: target,
                changeOrigin: true
            },
            '^/api/': {
                target: target,
                changeOrigin: true,
                pathRewrite: {
                    "^/api/": ""
                }
            }
        }
    },
    chainWebpack: config => {
        //移除Proload和Prefetch来实现懒加载
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    }
}