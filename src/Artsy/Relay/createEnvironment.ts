import "isomorphic-fetch"
import "regenerator-runtime/runtime"

import { version as ReactionVersion } from "package.json"
import RelayClientSSR from "react-relay-network-modern-ssr/lib/client"
import RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import { Environment, RecordSource, RelayNetwork, Store } from "relay-runtime"
import { data as sd } from "sharify"
import { NetworkError } from "Utils/errors"

import {
  cacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern"

const isServer = typeof window === "undefined"
const isDevelopment =
  (isServer ? process.env.NODE_ENV : sd.NODE_ENV) === "development"

// Only log on the client during development
const loggingEnabled = isDevelopment && !isServer

const METAPHYSICS_ENDPOINT = isServer
  ? process.env.METAPHYSICS_ENDPOINT
  : sd.METAPHYSICS_ENDPOINT

const USER_AGENT = `Reaction/${ReactionVersion}`

interface Config {
  cache?: object
  user?: User
  checkStatus?: boolean
  relayNetwork?: RelayNetwork
}

interface RelayEnvironment extends Environment {
  relaySSRMiddleware: RelayClientSSR | RelayServerSSR
}

export function createEnvironment(config: Config = {}) {
  const { cache = {}, checkStatus, user, relayNetwork } = config

  const relaySSRMiddleware = isServer
    ? new RelayServerSSR()
    : new RelayClientSSR(cache)

  relaySSRMiddleware.debug = false

  const headers = {
    "Content-Type": "application/json",
    /**
     * Chrome still doesn’t support setting the `User-Agent` header, but as this
     * isn’t critical information either we’re not going to work around it by
     * adding e.g. a `X-User-Agent` header, for now.
     *
     * See https://bugs.chromium.org/p/chromium/issues/detail?id=571722
     */
    "User-Agent": USER_AGENT,
  }

  let timeZone
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    headers["X-TIMEZONE"] = timeZone
  } catch (error) {
    console.warn("Browser does not support i18n API, not setting TZ header.")
  }

  const network =
    relayNetwork ||
    new RelayNetworkLayer([
      urlMiddleware({
        url: METAPHYSICS_ENDPOINT,
        headers: !!user
          ? {
              ...headers,
              "X-USER-ID": user && user.id,
              "X-ACCESS-TOKEN": user && user.accessToken,
            }
          : headers,
      }),
      relaySSRMiddleware.getMiddleware({
        lookup: true,
      }),
      cacheMiddleware({
        size: 100, // max 100 requests
        ttl: 900000, // 15 minutes
      }),

      // TODO: This has been moved over from `Utils/metaphysics` but can eventually
      // be replaced by error / retry middleware
      next => async req => {
        const response = await next(req)

        if (!checkStatus || (response.status >= 200 && response.status < 300)) {
          return response
        } else {
          const error = new NetworkError(response.statusText)
          error.response = response
          throw error
        }
      },
      loggingEnabled && loggerMiddleware(),
      loggingEnabled && errorMiddleware(),
    ])

  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  }) as RelayEnvironment

  environment.relaySSRMiddleware = relaySSRMiddleware

  return environment
}
