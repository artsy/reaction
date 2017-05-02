const requiredVersion = require("fs").readFileSync(".nvmrc", { encoding: "utf8" }).trim()

if (process.version !== requiredVersion) {
  console.error(`[!] This project requires Node.js ${requiredVersion}, current version is ${process.version}`)
  process.exit(1)
}
