import { Box, Theme } from "@artsy/palette"
import { SystemContext } from "Artsy"
import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "../CollectionsHubRails"

const RailsContainer = styled(Box)`
  max-width: 1250px;
`

storiesOf("Apps/Collect/Collection/Components", module).add(
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
        query CollectionsHubRailsStoryQuery($collectionID: String!) {
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
