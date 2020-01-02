import { data as sd } from "sharify"

export function getENV(ENV_VAR) {
  const isServer = typeof window === "undefined"
  const envVar = isServer ? process.env[ENV_VAR] : sd[ENV_VAR]
  return envVar
}
