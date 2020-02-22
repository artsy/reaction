import { data as sd } from "sharify"

export function getENV(ENV_VAR) {
  const isServer = typeof window === "undefined"

  let envVar
  if (isServer) {
    const httpContext = require("express-http-context")
    envVar = httpContext.get(ENV_VAR) ?? process.env[ENV_VAR]
  } else {
    envVar = sd[ENV_VAR]
  }

  return envVar
}
