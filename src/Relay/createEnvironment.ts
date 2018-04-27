import { Environment, Network, RecordSource, Store } from "relay-runtime"
import { metaphysics } from "../Utils/metaphysics"

interface EnvironmentProps {
  user?: User
  endpoint?: string
  checkStatus?: boolean
}

export function createEnvironment(config: EnvironmentProps) {
  const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
    return metaphysics(
      { query: operation.text, variables },
      {
        user: config.user,
        endpoint: config.endpoint,
        checkStatus: config.checkStatus,
      }
    )
  }
  const network = Network.create(fetchQuery)
  const source = new RecordSource()
  const store = new Store(source)
  return new Environment({
    network,
    store,
  })
}
