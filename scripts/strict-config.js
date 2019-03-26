/**
 * Generates a .tsconfig.strict.json file that's an extension of our normal
 * config with strict null checking enabled. It only adds files that have the
 * comment //@ts-strict at the top of them to the files section.
 */
const config = require("../tsconfig.json")
const child_process = require("child_process")
const fs = require("fs")
const { promisify } = require("util")
const path = require("path")

// Helpers to make the node apis a little more friendly
const exec = promisify(child_process.exec)
const writeFile = promisify(fs.writeFile)

// Options to enable for @ts-strict
config.compilerOptions.strictNullChecks = true

// Remove included files
delete config.include

// Write out strict config files
;(async () => {
  // Get files with comment
  const { stdout: grepOutput } = await exec(
    `grep -rl "@ts-strict" ${path.relative(
      process.cwd(),
      path.join(__dirname, "../src")
    )}`
  )

  // Add `files` option to tsconfig
  config.files = grepOutput.trim().split("\n")

  // write .tsconfig.strict.json
  writeFile(
    path.join(__dirname, "../.tsconfig.strict.json"),
    JSON.stringify(config, null, 2)
  )
})()
