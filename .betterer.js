const { typescriptBetterer } = require("@betterer/typescript")

module.exports = {
  "stricter compilation": typescriptBetterer("./tsconfig.json", {
    strict: true,
    pretty: true,
    noEmit: true,
  }),
}
