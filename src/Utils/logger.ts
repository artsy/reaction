import { head } from "lodash"
import { isErrorInfo, sendErrorToService } from "Utils/errors"

export const shouldCaptureError = (environment: string) =>
  environment === "staging" || environment === "production"

export default function createLogger(namespace = "reaction") {
  const formattedNamespace = `${namespace} |`

  return {
    log: (...messages) => {
      console.log(formattedNamespace, ...messages, "\n")
    },
    warn: (...warnings) => {
      console.warn(formattedNamespace, ...warnings, "\n")
    },
    error: (...errors) => {
      const error = head(errors.filter(e => e instanceof Error))
      const errorInfo = head(errors.filter(e => isErrorInfo(e)))

      if (error && shouldCaptureError(process.env.NODE_ENV)) {
        sendErrorToService(error, errorInfo)
      }

      console.error(formattedNamespace, ...errors, "\n")
    },
  }
}
