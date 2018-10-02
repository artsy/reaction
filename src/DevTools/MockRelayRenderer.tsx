import { ContextProvider } from "Artsy"
import { LoadingClassName } from "Artsy/Relay/renderWithLoadProgress"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React from "react"
import { QueryRenderer } from "react-relay"
import {
  Environment,
  GraphQLTaggedNode,
  RecordSource,
  Store,
} from "relay-runtime"
import { createMockNetworkLayer } from "./createMockNetworkLayer"
import { renderUntil, UntilCallback } from "./renderUntil"

export interface MockRelayRendererProps {
  Component: React.ComponentType
  query: GraphQLTaggedNode
  mockResolvers: IMocks
}

/**
 * Renders a tree of Relay containers.
 *
 * Because Relay works asynchronously _and_ a tree may contain nested
 * `QueryRenderer` components, you should usually use {@link renderRelayTree}.
 *
 * @param params.Component
 * The component that either is a Relay container or has children that are Relay
 * containers.
 *
 * @param params.query
 * The root GraphQL query.
 *
 * @param params.mockResolvers
 * A list of types/fields, that are part of metaphysics’ schema, and the data to
 * return for those. See {@link https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks}
 *
 * @example
 * 
   ```tsx
   jest.unmock("react-relay")
 
   const Artwork = createFragmentContainer(
     props => (
       <div>
         <span>{props.artwork.title}}</span>
         <img src={props.artwork.image.url} />
       </div>
     ),
     graphql`
       fragment MockRelayRenderer_artwork on Artwork {
         image {
           url
         }
       }
     `
   )

   it("renders a Relay tree", done => {
     const wrapper = mount(
       <MockRelayRenderer
         Component={Artwork}
         query={graphql`
           query MockRelayRendererQuery {
             artwork(id: "mona-lisa") {
               ...MockRelayRenderer_artwork
             }
           }
         `}
         mockResolvers={{
           Artwork: () => ({
             title: "Mona Lisa",
             image: {
               url: "http://test/image.jpg",
             },
           }),
         }}
       />
     )
     setTimeout(() => {
       expect(wrapper.find("span").text()).toEqual("Mona Lisa")
       expect(wrapper.find("img").props().src).toEqual("http://test/image.jpg")
       done()
     }, 10)
   })
   ```
 *
 */
export const MockRelayRenderer = ({
  Component,
  query,
  mockResolvers,
}: MockRelayRendererProps) => {
  if (
    typeof __webpack_require__ === "undefined" &&
    QueryRenderer === require("../../__mocks__/react-relay").QueryRenderer
  ) {
    throw new Error(
      "The `react-relay` module has been mocked, be sure to unmock it with: " +
        '`jest.unmock("react-relay")`'
    )
  }

  const network = createMockNetworkLayer({
    Query: () => ({}),
    ...mockResolvers,
  })
  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  })

  return (
    <ContextProvider relayEnvironment={environment}>
      <QueryRenderer
        // tslint:disable-next-line relay-operation-generics
        query={query}
        environment={environment}
        variables={{}}
        render={({ error, props, retry }) => {
          if (props) {
            return <Component {...props} />
          } else if (error) {
            return <div className="relay-error">{error}</div>
          } else {
            return <div className={LoadingClassName}>Loading</div>
          }
        }}
      />
    </ContextProvider>
  )
}

/**
 * Renders a tree of Relay containers and resolves the returned promise once
 * rendering has finished.
 *
 * It does this by checking the tree for the existence of an element with the
 * class defined by `LoadingClassName` from the `renderWithLoadProgress` module.
 * I.e. as long as at least 1 element exists in the tree with that class name,
 * rendering is not considered finished.
 *
 * @param params
 * See {@link MockRelayRenderer}
 *
 * @param until
 * An optional callback that is used to test wether rendering should be
 * considered finished. This is a regular enzyme wrapper.
 * 
 * @param wrapper
 * An optional component that the Relay tree should be nested in. Use this to
 * e.g. setup any context provider components etc.
 *
 * @example
 *
   ```tsx
   jest.unmock("react-relay")
 
   const Artwork = createFragmentContainer(
     props => (
       <div>
         <span>{props.artwork.title}}</span>
         <img src={props.artwork.image.url} />
       </div>
     ),
     graphql`
       fragment MockRelayRenderer_artwork on Artwork {
         image {
           url
         }
       }
     `
   )

   it("renders a Relay tree", () => {
     return renderRelayTree({
       Component: Artwork,
       query: graphql`
         query MockRelayRendererQuery {
           artwork(id: "mona-lisa") {
             ...MockRelayRenderer_artwork
           }
         }
       `,
       mockResolvers: {
         Artwork: () => ({
           title: "Mona Lisa",
           image: {
             url: "http://test/image.jpg",
           },
         }),
       },
     }).then(wrapper => {
       expect(wrapper.find("span").text()).toEqual("Mona Lisa")
       expect(wrapper.find("img").props().src).toEqual("http://test/image.jpg")
     })
   })
   ```
 *
 */
export function renderRelayTree<
  P = {},
  S = {},
  C extends React.Component = React.Component
>(
  params: MockRelayRendererProps & {
    until?: UntilCallback<P, S, C>
    wrapper?: (renderer: JSX.Element) => JSX.Element
  }
) {
  const { Component, query, mockResolvers, until, wrapper } = params
  const renderer = (
    <MockRelayRenderer
      Component={Component}
      mockResolvers={mockResolvers}
      query={query}
    />
  )
  return renderUntil<P, S, C>(
    until || (tree => !tree.find(`.${LoadingClassName}`).length),
    wrapper ? wrapper(renderer) : renderer
  )
}
