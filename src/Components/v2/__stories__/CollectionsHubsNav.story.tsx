import { Theme } from "@artsy/palette"
import { CollectionsHubsNavQuery } from "__generated__/CollectionsHubsNavQuery.graphql"
import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { MockRouterProvider } from "DevTools/MockRouterProvider"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsNavFragmentContainer } from "../CollectionsHubsNav"

storiesOf("Components/CollectionsHubsNav", module)
  .addDecorator(story => <MockRouterProvider>{story()}</MockRouterProvider>)
  .add("default", () => (
    <Theme>
      <CollectionsHubsNavQueryRenderer />
    </Theme>
  ))

const CollectionsHubsNavQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<CollectionsHubsNavQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query CollectionsHubsNavQuery {
          marketingCollections(size: 6) {
            ...CollectionsHubsNav_marketingCollections
          }
        }
      `}
      render={renderWithLoadProgress(CollectionsHubsNavFragmentContainer)}
    />
  )
}
