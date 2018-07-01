import React from "react"
import { buildClientApp } from "Router"

interface Props {
  routes: Array<object>
  initialRoute?: string
  initialState?: object
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
