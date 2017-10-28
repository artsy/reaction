const webpack = require("webpack")
const path = require("path")

module.exports = () => {
  return {
    entry: {
      // TODO: currently there are no apps
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
                transpileOnly: true, // FIXME: This is only for the duration of fixing all build issues during Relay migration.
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
      // TODO: currently there are no apps
      filename: "[name].js",
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
