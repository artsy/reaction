const fsbx = require("fuse-box")
const express = require("express")

module.exports = () => {
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
    outFile: "./reaction-force.js",
      sourceMap: {
        bundleReference: "./reaction-force.js.map",
        outFile: "./reaction-force.js.map",
      },
    plugins: [
      fsbx.BabelPlugin({}),
    ]
  })

  // Serve stories
  const server = fuse.devServer(`>__stories__/config.js 
    +babel-runtime/* 
    +components/__stories__/*.tsx
  `, { root: "." })

  // Serve Storybook bootstrap HTML
  server.httpServer.app.use("/", express.static("./.storybook"))
}
