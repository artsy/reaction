const { typescriptBetterer } = require("@betterer/typescript")

module.exports = {
  "stricter compilation": typescriptBetterer("./tsconfig.json", {
    strict: true,
    noEmit: true,
  }),
}
