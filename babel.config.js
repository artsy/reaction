module.exports = api => {
  const isTest = api.env("test")
  return {
    env: {
      test: {
        plugins: ["dynamic-import-node"],
      },
    },
    presets: [
      "@babel/typescript",
      "@babel/react",
      [
        "@babel/env",
        {
          useBuiltIns: "usage",
          modules: isTest ? "commonjs" : false,
        },
      ],
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true,
        },
      ],
      "@babel/plugin-proposal-class-properties",
      [
        "relay",
        {
          artifactDirectory: "./src/__generated__",
        },
      ],
      [
        "styled-components",
        {
          ssr: true,
        },
      ],
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          root: ["./src"],
          alias: {
            storybook: "./src/__stories__",
            Analytics: "./src/Analytics",
            Assets: "./src/Assets",
            Components: "./src/Components",
            Styleguide: "./src/Styleguide",
            "package.json": "./package.json",
          },
        },
      ],
      "lodash",
    ],
  }
}
