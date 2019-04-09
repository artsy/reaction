// @ts-check

const env = require("dotenv")
const path = require("path")
const sharify = require("./sharify")
const webpack = require("webpack")

const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")

const package = require("../package.json")

env.load()

const cacheDirectory = path.resolve(__dirname, "../", ".cache")

const {
  CI,
  CMS_URL,
  APP_URL,
  FACEBOOK_APP_NAMESPACE,
  PREDICTION_URL,
  FORCE_CLOUDFRONT_URL,
  GEMINI_CLOUDFRONT_URL,
  GENOME_URL,
  IMAGE_LAZY_LOADING,
  METAPHYSICS_ENDPOINT,
  NETLIFY,
  NODE_ENV,
  STRIPE_PUBLISHABLE_KEY,
  USER_ACCESS_TOKEN,
  USER_ID,
  USER_TYPE,
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
  CMS_URL,
  FACEBOOK_APP_NAMESPACE,
  PREDICTION_URL,
  FORCE_CLOUDFRONT_URL,
  GEMINI_CLOUDFRONT_URL,
  GENOME_URL,
  IMAGE_LAZY_LOADING,
  METAPHYSICS_ENDPOINT,
  NODE_ENV,
  STRIPE_PUBLISHABLE_KEY,
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
        USER_TYPE: JSON.stringify(USER_TYPE),
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

console.log("\n[Reaction] Booting...\n")

/**
 * Booting in full-control mode: https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode-default
 */
module.exports = async ({ config, mode }) => {
  config.mode = mode.toLowerCase()
  config.devtool = WEBPACK_DEVTOOL
  config.devServer = {
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: "errors-only",
  }
  config.resolve = {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      sharify: sharifyPath.replace(/\.js$/, ""),
      "styled-components": path.resolve("./node_modules/styled-components"),
    },
  }
  config.plugins = plugins
  config.module.rules.push(
    {
      test: /\.graphql$/,
      include: [/data/],
      exclude: [/node_modules/],
      use: [
        {
          loader: "raw-loader",
        },
      ],
    },
    {
      test: /\.tsx?$/,
      include: [/src/],
      exclude: [/node_modules/, new RegExp(package.jest.testRegex)],
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
    }
  )

  return config
}
