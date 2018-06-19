import React from "react"
import styled from "styled-components"
import { Serif } from "@artsy/palette"
import { Box } from "Styleguide/Elements/Box"
import { SizeInfo } from "./SizeInfo"
import { Separator } from "Styleguide/Elements/Separator"
import { Button } from "Styleguide/Elements/Button"

export interface CommercialProps {
  artwork: {
    readonly __id: string
    readonly sale_message: string | null
    readonly is_inquireable: boolean
    readonly is_price_range?: boolean | null
    readonly edition_sets: Array<{
      readonly __id: string
      readonly dimensions: {
        readonly in: string
        readonly cm: string
      }
      readonly edition_of?: string
    }>
  }
}

const CommercialContainer = styled(Box)`
  text-align: left;
`
const PricingInfoContainer = styled(Box)``

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
    return (
      <CommercialContainer pb={3}>
        {artwork.edition_sets.length < 2 ? (
          <PricingInfoContainer pb={2}>
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
