const fsbx = require("fuse-box")
const express = require("express")
const path = require("path")

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

const server = fuse.devServer("> apps/loyalty/router.tsx", {
  port: 8080
})

const app = server.httpServer.app
app.use("/", express.static("public"))
