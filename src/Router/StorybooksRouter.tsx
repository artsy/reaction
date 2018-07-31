import { IMocks } from "graphql-tools/dist/Interfaces"
import React from "react"
import { createMockNetworkLayer } from "Relay/createMockNetworkLayer"
import { buildClientApp } from "Router"
import { MatchingMediaQueries } from "./types"

interface Props {
  routes: Array<object>
  initialMatchingMediaQueries?: MatchingMediaQueries
  initialRoute?: string
  initialState?: object
  mockResolvers?: IMocks
}

export class StorybooksRouter extends React.Component<Props> {
  state = {
    ClientApp: null,
  }

  static defaultProps = {
    initialRoute: "/",
  }

  async componentDidMount() {
    try {
      const { ClientApp } = await buildClientApp({
        routes: this.props.routes,
        historyProtocol: "memory",
        initialRoute: this.props.initialRoute,
        initialMatchingMediaQueries: this.props.initialMatchingMediaQueries,
        relayNetwork:
          this.props.mockResolvers &&
          createMockNetworkLayer(this.props.mockResolvers),
      })

      this.setState({
        ClientApp,
      })
    } catch (error) {
      console.error("ArtistApp.story", error)
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
