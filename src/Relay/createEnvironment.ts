import "isomorphic-fetch"
import "regenerator-runtime/runtime"

import RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import RelayClientSSR from "react-relay-network-modern-ssr/lib/client"
import { Environment, Network, RecordSource, Store } from "relay-runtime"
import { NetworkError } from "../Utils/errors"
import { metaphysics } from "../Utils/metaphysics"

import {
  RelayNetworkLayer,
  urlMiddleware,
  cacheMiddleware,
  // loggerMiddleware,
} from "react-relay-network-modern"

interface Config {
  cache?: object
  user?: User
  checkStatus?: boolean
}

interface RelayEnvironment extends Environment {
  relaySSRMiddleware: RelayClientSSR | RelayServerSSR
}

export function createEnvironment(user?: User) {
  const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
    return metaphysics({ query: operation.text, variables }, user)
  }
  const network = Network.create(fetchQuery)
  const source = new RecordSource()
  const store = new Store(source)
  return new Environment({
    network,
    store,
  })
}

export function createRelayEnvironment(config: Config = {}) {
  const { cache = {}, checkStatus, user } = config
  const isServer = typeof window === "undefined"
  const relaySSRMiddleware = isServer
    ? new RelayServerSSR()
    : new RelayClientSSR(cache)

  relaySSRMiddleware.debug = false

  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Reaction",
  }

  const network = new RelayNetworkLayer([
    urlMiddleware({
      url: process.env.METAPHYSICS_ENDPOINT,
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
    // loggerMiddleware(),
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
