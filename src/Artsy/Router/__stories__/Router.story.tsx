import { storiesOf } from "@storybook/react"
import { PreloadLink } from "Artsy/Router"
import { ClientRouter } from "Artsy/Router/Components/ClientRouter"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { graphql } from "react-relay"

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
    Component: ({ artist, children, ...props }) => {
      return (
        <>
          <ContextConsumer>
            {context => {
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
            }}
          </ContextConsumer>
        </>
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

storiesOf("SSR Router/Example", module).add("Example Router App", () => {
  return (
    <ClientRouter
      routes={routes}
      context={{
        mediator: {
          trigger: x => x,
        },
      }}
    />
  )
})
