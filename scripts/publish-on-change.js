const chokidar = require("chokidar")
const { debounce } = require("lodash")
const { spawn } = require("child_process")

const run = (cmd, args = []) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(args)) {
      args = [args]
    }
    const p = spawn(cmd, args, {
      stdio: [process.stdin, process.stdout, process.stderr],
      cwd: process.cwd(),
      env: process.env,
      shell: true,
    })
    p.once("error", err => {
      reject(err)
    })
    p.once("exit", code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Exited with ${code}`))
      }
    })
  })

const updateDevPackage = () => {
  run("yarn", "yalc publish --force --changed --push")
}

console.log("Running yalc publish in watch mode")

chokidar
  .watch(process.cwd(), {
    ignored: /\/node_modules\/|\/dist\//,
  })
  .on("all", debounce(updateDevPackage, 750))
