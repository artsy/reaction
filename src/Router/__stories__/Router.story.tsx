import { storiesOf } from "@storybook/react"
import React, { Component } from "react"
import { graphql } from "react-relay"
import { buildClientApp, PreloadLink } from "../../Router"

class RouterExampleApp extends Component {
  state = {
    ClientApp: null,
  }

  async componentDidMount() {
    const routes = [
      {
        path: "/",
        query: graphql`
          query RouterQuery($artistID: String!) {
            artist(id: $artistID) {
              name
              bio
            }
          }
        `,
        prepareVariables: params => ({
          artistID: "andy-warhol",
        }),
        Component: ({ artist, children }) => {
          return (
            <div>
              <h1>Example Relay Router App</h1>
              <h3>{artist.name}</h3>
              <p>{artist.bio}</p>

              <nav>
                <ul>
                  <li>
                    <PreloadLink to="/home">Link to Home</PreloadLink>
                  </li>
                  <li>
                    <PreloadLink to="/about">Link to About</PreloadLink>
                  </li>
                  <li>
                    <PreloadLink to="/artist">Link to Artist</PreloadLink>
                  </li>
                </ul>
              </nav>

              {children}
            </div>
          )
        },
        children: [
          {
            path: "/home",
            Component: () => {
              return <h3>Home</h3>
            },
          },
          {
            path: "/about",
            Component: () => {
              return <h3>About</h3>
            },
          },
          {
            path: "/artist",
            Component: () => {
              return <h3>Artist</h3>
            },
          },
        ],
      },
    ]

    try {
      const { ClientApp } = await buildClientApp({
        routes,
        historyProtocol: "memory",
      })

      this.setState({
        ClientApp: () => <ClientApp />,
      })
    } catch (error) {
      console.error("Router.story", error)
    }
  }

  render() {
    const { ClientApp } = this.state
    return <div>{ClientApp && <ClientApp />}</div>
  }
}

storiesOf("SSR Router/Example", module).add("Example Router App", () => {
  return <RouterExampleApp />
})
