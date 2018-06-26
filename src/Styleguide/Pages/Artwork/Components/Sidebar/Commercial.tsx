import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Separator } from "Styleguide/Elements/Separator"
import { SizeInfoFragmentContainer as SizeInfo } from "./SizeInfo"

import { Commercial_artwork } from "__generated__/Commercial_artwork.graphql"

export interface CommercialProps {
  artwork: Commercial_artwork
}

const CommercialContainer = Box
const PricingInfoContainer = Box

export class Commercial extends React.Component<CommercialProps> {
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
          <PricingInfoContainer pb={2}>
            {this.renderSaleMessage()}
            <SizeInfo artwork={edition} />
          </PricingInfoContainer>
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
      <CommercialContainer pb={3} textAlign="left">
        {artwork.edition_sets.length < 2 && artwork.sale_message ? (
          <PricingInfoContainer pb={2} pt={1}>
            {this.renderSaleMessage()}
          </PricingInfoContainer>
        ) : (
          this.renderEditions()
        )}
        {artwork.is_inquireable && (
          <Button width="100%" size="medium" mt={1}>
            Contact Gallery
          </Button>
        )}
      </CommercialContainer>
    )
  }
}

export const CommercialFragmentContainer = createFragmentContainer(
  Commercial,
  graphql`
    fragment Commercial_artwork on Artwork {
      __id
      sale_message
      is_inquireable
      edition_sets {
        __id
        ...SizeInfo_artwork
      }
    }
  `
)
