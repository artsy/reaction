const proxy = require("http-proxy-middleware")

module.exports = function expressMiddleware(router) {
  router.use(
    "/fonts",
    proxy({
      target: "https://d1s2w0upia4e9w.cloudfront.net/",
      changeOrigin: true,
    })
  )
}
