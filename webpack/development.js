const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const { CheckerPlugin } = require("awesome-typescript-loader")

const commonConfig = require("./base")

module.exports = () => {
  return webpackMerge.smart({
    devtool: "inline-source-map",
    entry: {
      "login": [
        "webpack-hot-middleware/client",
      ],
      "inquiries": [
        "webpack-hot-middleware/client"
      ]
    },
    module: {
      rules: [
        {
          exclude: [/node_modules/, /__stories__/],
          use: [
            "react-hot-loader",
          ],
          test: /\.tsx?$/,
        }
      ],
    },
    plugins: [
      new CheckerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  }, commonConfig())
}
