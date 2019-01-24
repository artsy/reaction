import { Box, Flex } from "@artsy/palette"
import { AuctionCardFragmentContainer as AuctionCard } from "Components/v2/AuctionCard"
import React from "react"
import { data as sd } from "sharify"
import { Header } from "./OtherWorks/Header"

interface OtherAuctionsProps {
  auctions: any
}
export class OtherAuctions extends React.Component<OtherAuctionsProps> {
  render() {
    return (
      <Box mt={6}>
        <Header title="Other auctions" buttonHref={sd.APP_URL + "/auctions"} />
        <Flex flexWrap="wrap" mr={-2} width="100%">
          {this.props.auctions.map((auction, index) => {
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
