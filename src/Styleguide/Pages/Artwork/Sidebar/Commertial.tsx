import React from "react"
import styled from "styled-components"
import { Serif } from "@artsy/palette"
import { space, SpaceProps } from "styled-system"
import { SizeInfo } from "./SizeInfo"
import { RulerSeparator } from "../../../Elements/RulerSeparator"
import { Button } from "../../../Elements/Button"

export interface CommertialProps {
  artwork: {
    readonly sale_message: string | null
    readonly is_inquireable: boolean
    readonly is_price_range?: boolean | null
    readonly edition_sets: Array<{
      readonly dimensions: {
        readonly in: string
        readonly cm: string
      }
      readonly edition_of?: string
    }>
  }
}

const CommertialContainer = styled.div.attrs<SpaceProps>({})`
  text-align: left;
  ${space};
`
const PricingInfoContainer = styled.div.attrs<SpaceProps>({})`
  ${space};
`

export class Commertial extends React.Component<CommertialProps> {
  renderSaleMessage(artwork) {
    return <Serif size="5t">{artwork.sale_message}</Serif>
  }

  renderEditions(editions) {
    return editions.map((edition, index) => {
      return (
        <React.Fragment>
          <PricingInfoContainer pb={4}>
            {this.renderSaleMessage(edition)}
            <SizeInfo artwork={edition} />
          </PricingInfoContainer>
          {index !== editions.length - 1 && <RulerSeparator />}
        </React.Fragment>
      )
    })
  }

  render() {
    const { artwork } = this.props
    return (
      <CommertialContainer pb={4}>
        {artwork.edition_sets.length < 2 ? (
          <PricingInfoContainer pb={4}>
            {this.renderSaleMessage(artwork)}
          </PricingInfoContainer>
        ) : (
          this.renderEditions(artwork.edition_sets)
        )}
        {artwork.is_inquireable && (
          <Button width="100%" size="medium">
            Contact Gallery
          </Button>
        )}
      </CommertialContainer>
    )
  }
}
