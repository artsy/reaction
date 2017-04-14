const webpack = require("webpack")
const webpackMerge = require("webpack-merge")

const commonConfig = require("./base")

module.exports = () => {
  return webpackMerge.smart(commonConfig(), {
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production"),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: true,
        mangle: {
          keep_fnames: true
        },
        sourceMap: true,
      })
    ],
  })
}
