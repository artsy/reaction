import React from "react"
import { buildClientApp } from "Router"

interface Props {
  routes: any // FIXME
}

export class StorybooksRouter extends React.Component<Props> {
  state = {
    ClientApp: null,
  }

  async componentDidMount() {
    try {
      const { ClientApp } = await buildClientApp({
        routes: this.props.routes,
        historyProtocol: "memory",
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
    return <div>{ClientApp && <ClientApp />}</div>
  }
}
