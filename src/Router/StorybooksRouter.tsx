import React from "react"
import { buildClientApp } from "Router"
import { Container } from "unstated"

interface Props {
  routes: Array<object>
  initialRoute?: string
  initialState?: Array<Container<any>>
  initialAppState?: object
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
    const { ClientApp } = this.state

    return <React.Fragment>{ClientApp && <ClientApp />}</React.Fragment>
  }
}
