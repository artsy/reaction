import { Box, Button, Separator, Serif } from "@artsy/palette"
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

  handleCreateInquiry = e => {
    console.log("Creating inquiry")
  }

  handleCreateOrder = e => {
    console.log("Creating order")
  }

  handleCreateOfferOrder = e => {
    console.log("Creating offer")
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
        {(artwork.is_acquireable || artwork.is_offerable) &&
          artwork.shippingInfo && (
            <Serif size="2" color="black60">
              {artwork.shippingInfo}
            </Serif>
          )}
        {(artwork.is_acquireable || artwork.is_offerable) &&
          artwork.shippingOrigin && (
            <Serif size="2" color="black60">
              Ships from {artwork.shippingOrigin}
            </Serif>
          )}
        {artwork.is_inquireable && (
          <Button
            width="100%"
            size="medium"
            mt={1}
            onClick={this.handleCreateInquiry}
          >
            Contact Gallery
          </Button>
        )}
        {artwork.is_acquireable && (
          <Button
            width="100%"
            size="medium"
            mt={1}
            onClick={this.handleCreateOrder}
          >
            Buy Now
          </Button>
        )}
        {artwork.is_offerable && (
          <Button
            variant={
              artwork.is_acquireable ? "secondaryOutline" : "primaryBlack"
            }
            width="100%"
            size="medium"
            mt={1}
            onClick={this.handleCreateOfferOrder}
          >
            Make Offer
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
      is_acquireable
      is_inquireable
      is_offerable
      sale_message
      shippingInfo
      shippingOrigin
      edition_sets {
        __id
        ...ArtworkSidebarSizeInfo_piece
      }
    }
  `
)
