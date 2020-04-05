import { Box } from "@artsy/palette"
import { SelectedWorks_selectedWorks } from "__generated__/SelectedWorks_selectedWorks.graphql"
import { useSystemContext } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface SelectedWorksProps {
  selectedWorks: SelectedWorks_selectedWorks
}

const SelectedWorks: React.FC<SelectedWorksProps> = props => {
  const { mediator } = useSystemContext()

  return (
    <Box maxWidth="720px" style={{ margin: "0 auto" }}>
      <ArtworkGrid
        artworks={props.selectedWorks.itemsConnection}
        columnCount={[2, 3]}
        preloadImageCount={0}
        mediator={mediator}
      />
    </Box>
  )
}

export const SelectedWorksFragmentContainer = createFragmentContainer(
  SelectedWorks,
  {
    selectedWorks: graphql`
      fragment SelectedWorks_selectedWorks on OrderedSet {
        itemsConnection {
          ...ArtworkGrid_artworks
        }
      }
    `,
  }
)
