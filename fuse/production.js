const fsbx = require("fuse-box");

module.exports = opts => {
    const REACT_DEPS = `
        +react
        +react-dom
        +react-router
        +styled-components
    `

    fsbx.FuseBox.init({
        homeDir: "src/apps/loyalty",
        log: false,
        outFile: `${opts.root}/bundles/vendor.js`,
        plugins: [
            fsbx.UglifyJSPlugin()
        ]
    }).bundle(REACT_DEPS);

    fsbx.FuseBox.init({
        homeDir: "src/apps/loyalty",
        log: true,
        cache: false,
        plugins: [
            fsbx.EnvPlugin({ NODE_ENV: "production" }),
            fsbx.TypeScriptHelpers(),
            fsbx.UglifyJSPlugin()
        ],
        outFile: `${opts.root}/bundles/app.js`,
    }).bundle(">router.tsx");
}