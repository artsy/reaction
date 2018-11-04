import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { RouterConfig } from "Artsy/Router"
import { buildClientApp } from "Artsy/Router/buildClientApp"
import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import { HistoryOptions } from "farce"
import { RouteConfig } from "found"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React from "react"
import { getUser } from "Utils/getUser"

interface Props {
  routes: RouteConfig[]
  initialRoute?: string
  initialState?: object
  historyOptions?: HistoryOptions
  mockResolvers?: IMocks
  context?: RouterConfig["context"]
}

export class MockRouter extends React.Component<Props> {
  state = {
    ClientApp: null,
  }

  static defaultProps = {
    initialRoute: "/",
  }

  async componentDidMount() {
    const {
      routes,
      initialRoute,
      historyOptions,
      mockResolvers,
      context,
    } = this.props

    try {
      const user = getUser(context && context.user)

      const { ClientApp } = await buildClientApp({
        routes,
        initialRoute,
        history: {
          protocol: "memory",
          options: historyOptions,
        },
        context: {
          ...context,
          user,
          relayEnvironment:
            mockResolvers &&
            createRelaySSREnvironment({
              relayNetwork: createMockNetworkLayer(mockResolvers),
            }),
        },
      })

      this.setState({
        ClientApp,
      })
    } catch (error) {
      console.error("MockRouter", error)
    }
  }

  render() {
    const { ClientApp } = this.state

    return (
      <React.Fragment>
        {ClientApp && <ClientApp {...this.props.initialState} />}
      </React.Fragment>
    )
  }
}
