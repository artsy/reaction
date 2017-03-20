const fsbx = require("fuse-box")
const express = require("express")
const path = require("path")

module.exports = opts => {
    const REACT_DEPS = `
        +react
        +react-dom
        +styled-components
    `
    // bundle vendor
    fsbx.FuseBox.init({
        homeDir: "src"
    }).bundle({
        [`${opts.root}/bundles/vendor.js`]: REACT_DEPS
    })

    const containerNames = ["login", "inquiries"]
    const multipleBundles = (() => {
        let bundles = {}

        for (let name of containerNames) {
            bundles[`${opts.root}/bundles/${name}.js`] = 
                `>apps/loyalty/client/containers/${name}/browser.tsx`
        }

        return bundles
    })()

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
    
    config.bundle(multipleBundles)

    const app = require(path.resolve(__dirname, '..', opts.root)).default
    app.use(express.static(path.resolve(__dirname, '..', 'assets')))
    
    app.listen(opts.port, () => {
        console.log(`✨  Listening on http://localhost:${opts.port}`)
    })
}
