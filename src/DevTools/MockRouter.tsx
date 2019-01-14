import { RouterConfig } from "Artsy/Router"
import { buildClientApp } from "Artsy/Router/buildClientApp"
import {
  createMockNetworkLayer,
  createMockNetworkLayer2,
} from "DevTools/createMockNetworkLayer"
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
  mockData?: object
  mockMutationResults?: object
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
      initialMatchingMediaQueries,
      mockResolvers,
      mockData,
      mockMutationResults,
      context,
    } = this.props

    try {
      const user = getUser(context && context.user)

      const relayNetwork = mockResolvers
        ? createMockNetworkLayer(mockResolvers)
        : mockData || mockMutationResults
          ? createMockNetworkLayer2(mockData, mockMutationResults)
          : undefined

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
          relayNetwork,
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
