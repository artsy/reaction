const env = require("dotenv")
const fs = require("fs")
const path = require("path")
const sharify = require("./sharify")

const webpack = require("webpack")
const merge = require("webpack-merge")
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js")

const { CheckerPlugin } = require("awesome-typescript-loader")

env.load()

/**
 * Write out a file that stubs the data that’s normally shared with the client through the `sharify` module. This file
 * is then replaced in the product of webpack where normally the actual `sharify` module would be loaded.
 */
const {
  WEBPACK_DEVTOOL = "cheap-module-eval-source-map",
  METAPHYSICS_ENDPOINT,
  USER_ID,
  USER_ACCESS_TOKEN,
} = process.env

const sharifyPath = sharify({
  METAPHYSICS_ENDPOINT,
})

const plugins = [new CheckerPlugin()]
if (USER_ID && USER_ACCESS_TOKEN) {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.USER_ID": JSON.stringify(USER_ID),
      "process.env.USER_ACCESS_TOKEN": JSON.stringify(USER_ACCESS_TOKEN),
    })
  )
} else {
  console.warn(
    "\x1b[31m[!] Specify USER_ID and USER_ACCESS_TOKEN environment variables to use authenticated features.\x1b[0m"
  )
}

// A mix of  the base from Emission's webpack setup, and the simple config for
// storybooks: https://storybook.js.org/configurations/custom-webpack-config/

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)
  // The progress plugin does not play nice with `concurrently`, so remove it.
  config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin")

  const merged = merge(config, {
    devtool: WEBPACK_DEVTOOL,
    devServer: {
      stats: "errors-only",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        sharify: sharifyPath.replace(/\.js$/, ""),
      },
    },
    module: {
      rules: [
        {
          exclude: [/node_modules/, /__tests__/],
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
    plugins: plugins,
  })
  return merged
}
