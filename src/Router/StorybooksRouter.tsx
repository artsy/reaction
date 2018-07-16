import React from "react"
import { buildClientApp } from "Router"
import { Container } from "unstated"
import { App, AppProps } from "./types"

interface Props extends Partial<AppProps> {
  routes: Array<object>
  initialRoute?: string
  initialState?: Array<Container<any>>
  initialAppState?: object
}

interface State {
  ClientApp: App
}

export class StorybooksRouter extends React.Component<Props, State> {
  static defaultProps = {
    initialRoute: "/",
  }

  async componentDidMount() {
    try {
      const { ClientApp } = await buildClientApp({
        routes: this.props.routes,
        historyProtocol: "memory",
        initialRoute: this.props.initialRoute,
        initialAppState: this.props.initialAppState,
        initialState: this.props.initialState,
      })

      this.setState({
        ClientApp,
      })
    } catch (error) {
      console.error("ArtistApp.story", error)
    }
  }

  render() {
    const ClientApp = this.state && this.state.ClientApp

    return (
      <React.Fragment>
        {ClientApp && (
          <ClientApp subscribeTo={this.props.subscribeTo}>
            {this.props.children}
          </ClientApp>
        )}
      </React.Fragment>
    )
  }
}
