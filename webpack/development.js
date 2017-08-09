const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const { CheckerPlugin } = require("awesome-typescript-loader")

const commonConfig = require("./base")

module.exports = () => {
  const base = commonConfig()

  const tsLoader = base.module.rules.find(rule => {
    return rule.use && rule.use.find(entry => entry.loader === "awesome-typescript-loader")
  })

  return webpackMerge.smart(
    {
      devtool: "inline-source-map",
      entry: {
        login: ["webpack-hot-middleware/client"],
        inquiries: ["webpack-hot-middleware/client"],
      },
      module: {
        rules: [Object.assign({}, tsLoader, { use: ["react-hot-loader"] })],
      },
      plugins: [new CheckerPlugin(), new webpack.HotModuleReplacementPlugin()],
    },
    base
  )
}
