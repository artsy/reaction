import { NetworkError } from "Utils/errors"

/**
 * TODO: This has been moved over from `Utils/metaphysics` but can eventually
 * be replaced by error / retry middleware
 */
export function responseStatusMiddleware({ checkStatus }) {
  return next => async req => {
    const response = await next(req)
    if (!checkStatus || (response.status >= 200 && response.status < 300)) {
      return response
    } else {
      const error = new NetworkError(response.statusText)
      error.response = response
      throw error
    }
  }
}
