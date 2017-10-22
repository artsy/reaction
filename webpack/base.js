const webpack = require("webpack")
const path = require("path")

module.exports = () => {
  return {
    entry: {
      login: ["babel-polyfill", "./src/Apps/Loyalty/Containers/Login/Browser"],
      inquiries: ["babel-polyfill", "./src/Apps/Loyalty/Containers/Inquiries/Browser"],
      forgot_password: ["babel-polyfill", "./src/Apps/Loyalty/Containers/ForgotPassword/Browser"],
      analytics: ["babel-polyfill", "./src/Apps/Loyalty/ClientSideAnalytics"],
    },
    module: {
      rules: [
        { test: /\.json$/, loader: "json-loader" },
        {
          exclude: [/node_modules/, /__stories__/, /__tests__/],
          use: [
            {
              loader: "awesome-typescript-loader",
              options: {
                useBabel: true,
                useCache: true,
                useTranspileModule: true, // Supposedly faster, won’t work if/when we emit TS declaration files.
              },
            },
          ],
          test: /\.tsx?$/,
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "../dist/Apps/Loyalty/Server/bundles"),
      publicPath: "/Loyalty/bundles",
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
      },
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin("commons.chunk")],
    resolve: {
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
  }
}
