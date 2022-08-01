// 设置请求代理
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3300',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  )
}
