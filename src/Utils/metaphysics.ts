import "isomorphic-fetch"
import * as sharify from "sharify"
import { NetworkError } from "./errors"

export function metaphysics<T>(
  payload: { query: string; variables?: object },
  user?: User,
  checkStatus: boolean = true
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Reaction",
  }

  // TODO: rename User to AuthTokens and conver to union type
  const AuthHeaders = !!user
    ? !!user.appToken
      ? { "X-XAPP-TOKEN": user.appToken }
      : {
          "X-USER-ID": user.id,
          "X-ACCESS-TOKEN": user.accessToken,
        }
    : null

  return fetch(sharify.data.METAPHYSICS_ENDPOINT, {
    method: "POST",
    headers: !!user
      ? {
          ...headers,
          ...AuthHeaders,
        }
      : headers,
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!checkStatus || (response.status >= 200 && response.status < 300)) {
        return response
      } else {
        const error = new NetworkError(response.statusText)
        error.response = response
        throw error
      }
    })
    .then<T>(response => response.json())
}

export function query<T>(query: string): Promise<T> {
  return metaphysics<{ data: T }>({ query }).then(({ data }) => data)
}
