import { Environment, Network, RecordSource, Store } from "relay-runtime"
import { metaphysics } from "../Utils/metaphysics"

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
