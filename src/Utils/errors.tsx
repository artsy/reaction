import * as Sentry from "@sentry/browser"

export class NetworkError extends Error {
  response: any
}

interface ErrorInfo {
  componentStack: string
}

// We don't know what we'll receive through `logger.error` but sometimes
// we expect an ErrorInfo object if an error is thrown in an error boundary.
// We want to be able to check if an object implements the expected ErrorInfo
// interface so we can pass it along to Sentry.
export const isErrorInfo = (arg: any): arg is ErrorInfo =>
  !!(arg && arg.componentStack && typeof arg.componentStack === "string")

export const sendErrorToService = (error: Error, errorInfo?: ErrorInfo) => {
  Sentry.withScope(scope => {
    Object.keys(errorInfo).forEach(key => {
      scope.setExtra(key, errorInfo[key])
    })
    Sentry.captureException(error)
  })
}
