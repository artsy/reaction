const env = require("dotenv")
const fs = require("fs")
const path = require("path")
const sharify = require("./sharify")

const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")

const webpack = require("webpack")
const merge = require("webpack-merge")

env.load()

const cacheDirectory = path.resolve(__dirname, "../", ".cache")

const {
  CI,
  APP_URL,
  FORCE_CLOUDFRONT_URL,
  GEMINI_CLOUDFRONT_URL,
  METAPHYSICS_ENDPOINT,
  NETLIFY,
  NODE_ENV,
  USER_ACCESS_TOKEN,
  USER_ID,
  USER_LAB_FEATURES,
  WEBPACK_DEVTOOL = "cheap-module-eval-source-map",
  XAPP_TOKEN,
} = process.env

const isCI = CI || NETLIFY
const notOnCI = value => (isCI ? [] : [value])

/**
 * Write out a file that stubs the data that’s normally shared with the client
 * through the `sharify` module. This file is then replaced in the product of
 * webpack where normally the actual `sharify` module would be loaded.
 */
const sharifyPath = sharify({
  APP_URL,
  FORCE_CLOUDFRONT_URL,
  GEMINI_CLOUDFRONT_URL,
  METAPHYSICS_ENDPOINT,
  NODE_ENV,
  XAPP_TOKEN,
})

const plugins = [
  new ForkTsCheckerWebpackPlugin({
    formatter: "codeframe",
    formatterOptions: "highlightCode",
    tslint: false,
    checkSyntacticErrors: true,
    watch: ["./src"],
  }),
  new ForkTsCheckerNotifierWebpackPlugin({
    excludeWarnings: true,
    skipFirstNotification: true,
  }),
  ...notOnCI(new SimpleProgressWebpackPlugin({ format: "compact" })),
  new webpack.NoEmitOnErrorsPlugin(),
]

if (USER_ID && USER_ACCESS_TOKEN) {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        USER_ID: JSON.stringify(USER_ID),
        USER_ACCESS_TOKEN: JSON.stringify(USER_ACCESS_TOKEN),
        USER_LAB_FEATURES: JSON.stringify(USER_LAB_FEATURES),
        XAPP_TOKEN: JSON.stringify(XAPP_TOKEN),
      },
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
  console.log("\n[Reaction] Booting...\n")

  const merged = merge(baseConfig, {
    mode: env.toLowerCase(),
    devtool: WEBPACK_DEVTOOL,
    devServer: {
      overlay: {
        warnings: true,
        errors: true,
      },
      stats: "errors-only",
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      alias: {
        sharify: sharifyPath.replace(/\.js$/, ""),
        "styled-components": path.resolve("./node_modules/styled-components"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [/src/],
          exclude: [/node_modules/, /__tests__/],
          use: [
            {
              loader: "cache-loader",
              options: {
                cacheDirectory: path.join(cacheDirectory),
              },
            },
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: path.join(cacheDirectory, "babel"),
              },
            },
          ],
        },
        // ESM support. See: https://github.com/apollographql/react-apollo/issues/1737#issuecomment-371178602
        {
          type: "javascript/auto",
          test: /\.mjs$/,
          use: [],
        },
      ],
    },
    plugins: plugins,
  })
  return merged
}
