import { data as sd } from "sharify"

export function getENV(ENV_VAR) {
  let envVar
  if (typeof window === "undefined") {
    envVar = process.env[ENV_VAR]
  } else {
    envVar = sd[ENV_VAR]
  }

  return envVar
}
