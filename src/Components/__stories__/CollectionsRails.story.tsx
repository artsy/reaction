import { Box, Theme } from "@artsy/palette"
import { SystemContext } from "Artsy"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "Components/CollectionsHubRails"
import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"

const RailsContainer = styled(Box)`
  max-width: 1250px;
`

storiesOf("Components/CollectionsRails", module).add(
  "Collection Hub Rails",
  () => (
    <Theme>
      <RailsContainer width="100%">
        <CollectionHubRailsQueryRenderer collectionID="street-art-now" />
      </RailsContainer>
    </Theme>
  )
)

interface Props {
  collectionID: string
}

export const CollectionHubRailsQueryRenderer: React.FC<Props> = ({
  collectionID,
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    // tslint:disable-next-line:relay-operation-generics
    <QueryRenderer
      environment={relayEnvironment}
      variables={{
        collectionID,
      }}
      query={graphql`
        query CollectionsRailsQuery($collectionID: String!) {
          marketingCollection(slug: $collectionID) {
            linkedCollections {
              ...CollectionsHubRails_linkedCollections
            }
          }
        }
      `}
      render={({ props }) => {
        if (props) {
          const { linkedCollections } = props.marketingCollection
          return <CollectionsHubRails linkedCollections={linkedCollections} />
        } else {
          return null
        }
      }}
    />
  )
}
