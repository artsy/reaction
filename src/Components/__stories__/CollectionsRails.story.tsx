import { Box, Theme } from "@artsy/palette"
import { SystemContext } from "Artsy"
import { FeaturedCollectionsRails } from "Components/CollectionsRails/FeaturedCollectionsRails"
import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"

const RailsContainer = styled(Box)`
  max-width: 1250px;
`

storiesOf("Components/CollectionsRails", module).add(
  "Featured Collections Rail",
  () => (
    <Theme>
      <RailsContainer width="100%">
        <FeaturedCollectionsRailQueryRenderer collectionID="street-art-now" />
      </RailsContainer>
    </Theme>
  )
)

interface Props {
  collectionID: string
}

export const FeaturedCollectionsRailQueryRenderer: React.FC<Props> = ({
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
            ...FeaturedCollectionsRails_marketingCollection
          }
        }
      `}
      render={({ props }) => {
        if (props) {
          return <FeaturedCollectionsRails {...props as any} />
        } else {
          return null
        }
      }}
    />
  )
}
