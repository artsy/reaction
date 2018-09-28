import { createMockNetworkLayer } from "Artsy/Relay/createMockNetworkLayer"
import { buildClientApp } from "Artsy/Router/buildClientApp"
import { ContextProps } from "Artsy/SystemContext"
import { HistoryOptions } from "farce"
import { RouteConfig } from "found"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React from "react"
import { getUser } from "Utils/getUser"
import { MatchingMediaQueries } from "Utils/Responsive"

interface Props {
  routes: RouteConfig[]
  initialMatchingMediaQueries?: MatchingMediaQueries
  initialRoute?: string
  initialState?: object
  historyOptions?: HistoryOptions
  mockResolvers?: IMocks
  context?: ContextProps
}

export class ClientRouter extends React.Component<Props> {
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
      initialMatchingMediaQueries,
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
          initialMatchingMediaQueries,
          relayNetwork: mockResolvers && createMockNetworkLayer(mockResolvers),
        },
      })

      this.setState({
        ClientApp,
      })
    } catch (error) {
      console.error("ClientRouter", error)
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
