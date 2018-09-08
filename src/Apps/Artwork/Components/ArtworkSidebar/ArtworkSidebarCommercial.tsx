import { Box, Separator, Serif } from "@artsy/palette"
import { Button } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"

import { ArtworkSidebarCommercial_artwork } from "__generated__/ArtworkSidebarCommercial_artwork.graphql"

export interface ArtworkSidebarCommercialProps {
  artwork: ArtworkSidebarCommercial_artwork
}

export class ArtworkSidebarCommercial extends React.Component<
  ArtworkSidebarCommercialProps
> {
  renderSaleMessage() {
    return (
      <Serif size="5t" weight="semibold">
        {this.props.artwork.sale_message}
      </Serif>
    )
  }

  renderEditions() {
    const editions = this.props.artwork.edition_sets
    return editions.map((edition, index) => {
      return (
        <React.Fragment key={edition.__id}>
          <Box pb={2}>
            {this.renderSaleMessage()}
            <SizeInfo piece={edition} />
          </Box>
          {index !== editions.length - 1 && <Separator />}
        </React.Fragment>
      )
    })
  }

  render() {
    const { artwork } = this.props
    if (!artwork.sale_message && !artwork.is_inquireable) {
      return null
    }
    return (
      <Box pb={3} textAlign="left">
        {artwork.edition_sets.length < 2 && artwork.sale_message ? (
          <Box pb={2} pt={1}>
            {this.renderSaleMessage()}
          </Box>
        ) : (
          this.renderEditions()
        )}
        {artwork.is_inquireable && (
          <Button width="100%" size="medium" mt={1}>
            Contact Gallery
          </Button>
        )}
      </Box>
    )
  }
}

export const ArtworkSidebarCommercialFragmentContainer = createFragmentContainer(
  ArtworkSidebarCommercial,
  graphql`
    fragment ArtworkSidebarCommercial_artwork on Artwork {
      __id
      sale_message
      is_inquireable
      edition_sets {
        __id
        ...ArtworkSidebarSizeInfo_piece
      }
    }
  `
)
