const fsbx = require("fuse-box")
const express = require("express")
const path = require("path")

module.exports = opts => {
    const REACT_DEPS = `
        +react
        +react-dom
        +react-router
        +styled-components
    `
    // bundle vendor
    fsbx.FuseBox.init({
        homeDir: "src"
    }).bundle({
        [`${opts.root}/bundles/vendor.js`]: REACT_DEPS
    });

    // Start dev Socket
    // Isolate dependencies
    const config = fsbx.FuseBox.init({
        homeDir: "src",
        tsConfig: "./tsconfig.json",
        log: true,
        debug: true,
        alias: {
            "components/*": `~/components/*`,
        },
        plugins: [
            fsbx.JSONPlugin(),
            fsbx.TypeScriptHelpers()
        ],
        outFile: `${opts.root}/bundles/app.js`,
    })
    
    config.bundle(">[apps/loyalty/router.tsx]")
    const server = config.devServer(">[apps/loyalty/router.tsx] +process", opts);

    const app = server.httpServer.app;
    app.use(express.static(path.resolve(__dirname, '..', opts.root)));
    app.use(express.static(path.resolve( __dirname,'..', 'assets')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', opts.root, 'index.html'));
    });
}
