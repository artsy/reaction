const { typescriptBetterer } = require("@betterer/typescript")

module.exports = {
  "stricter compilation": typescriptBetterer("./tsconfig.json", {
    useStrict: true,
    strict: true,
    pretty: true,
    noEmit: true,
  }),
}
