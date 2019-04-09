import { Box, Flex } from "@artsy/palette"
import { OtherAuctions_sales } from "__generated__/OtherAuctions_sales.graphql"
import { AuctionCardFragmentContainer as AuctionCard } from "Components/v2/AuctionCard"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "./OtherWorks/Header"

interface OtherAuctionsProps {
  sales: OtherAuctions_sales
}
export class OtherAuctions extends React.Component<OtherAuctionsProps> {
  render() {
    console.log({ sales: this.props.sales })
    return (
      <Box mt={6}>
        <Header title="Other auctions" buttonHref={sd.APP_URL + "/auctions"} />
        <Flex flexWrap="wrap" mr={-2} width="100%">
          {this.props.sales.map((auction, index) => {
            return (
              <Box pr={2} mb={[1, 4]} width={["100%", "25%"]} key={index}>
                <AuctionCard sale={auction} />
              </Box>
            )
          })}
        </Flex>
      </Box>
    )
  }
}

export const OtherAuctionsFragmentContainer = createFragmentContainer(
  OtherAuctions,
  graphql`
    fragment OtherAuctions_sales on Sale @relay(plural: true) {
      ...AuctionCard_sale
    }
  `
)
