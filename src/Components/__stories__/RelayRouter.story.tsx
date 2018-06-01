import { storiesOf } from "@storybook/react"
import React, { Component } from "react"
import { buildClientApp } from "../../Router"
import { graphql } from "react-relay"

class Container extends Component {
  state = {
    ClientApp: null,
  }

  async componentDidMount() {
    const routes = [
      {
        Component: ({ artist }) => {
          return (
            <div>
              <h1>Example Relay Router App</h1>
              <h3>{artist.name}</h3>
              <p>{artist.bio}</p>
            </div>
          )
        },
        path: "*",
        query: graphql`
          query RelayRouterQuery($artistID: String!) {
            artist(id: $artistID) {
              name
              bio
            }
          }
        `,
        prepareVariables: params => ({
          artistID: "andy-warhol",
        }),

        // TODO: Figure out how to get around Storybooks + iFrame. For now only
        // a single-route example is possible since cant push into top-level history.
        // children: []
      },
    ]

    try {
      const { ClientApp } = await buildClientApp({ routes })

      this.setState({
        ClientApp: () => <ClientApp />,
      })
    } catch (error) {
      console.error("RelayRouter.story", error)
    }
  }

  render() {
    const { ClientApp } = this.state
    return <div>{ClientApp && <ClientApp />}</div>
  }
}

storiesOf("RelayRouter/Example", module).add("Example Router App", () => {
  return <Container />
})
