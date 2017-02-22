const fsbx = require("fuse-box")

// The Storybook UI
const storybookManager = fsbx.FuseBox.init({
  homeDir: "./node_modules/@kadira/storybook/dist/client/manager",
  outFile: "./.storybook/manager.js",
})
storybookManager.bundle("> index.js")

// Reaction-Force
const fuse = fsbx.FuseBox.init({
  homeDir: "src",
  tsConfig: "./tsconfig.json",
  outFile: "./assets/reaction-force.js",
  plugins: [
    fsbx.BabelPlugin({}),
  ]
})

// Serve stories
const server = fuse.devServer(">__stories__/config.js +babel-runtime/* +components/__stories__/*.tsx", { root: "." })

// Serve Storybook bootstrap HTML
const app = server.httpServer.app
app.use("/", require("express").static("./.storybook"))
