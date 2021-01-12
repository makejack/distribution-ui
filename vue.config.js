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
    }
}