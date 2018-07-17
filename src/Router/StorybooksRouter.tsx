import React from "react"
import { buildClientApp } from "Router"
import { App, AppConfig } from "./types"

interface Props extends AppConfig {}

interface State {
  ClientApp: App
}

export class StorybooksRouter extends React.Component<Props, State> {
  static defaultProps = {
    initialRoute: "/",
  }

  async componentDidMount() {
    const { children, ...props } = this.props
    try {
      const { ClientApp } = await buildClientApp({
        historyProtocol: "memory",
        ...props,
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

    return <React.Fragment>{ClientApp && <ClientApp />}</React.Fragment>
  }
}
