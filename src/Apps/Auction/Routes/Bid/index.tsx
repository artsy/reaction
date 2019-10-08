import { Box, Separator, Serif } from "@artsy/palette"
import { BidFormFragmentContainer as BidForm } from "Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "Apps/Auction/Components/LotInfo"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, RelayProp } from "react-relay"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/Bid")

interface BidProps {
  artwork: any
  me: any
  relay: RelayProp
}

export const BidRoute: React.FC<BidProps> = props => {
  const { me, artwork } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
  logger.log({
    me,
    sale,
    artwork,
    saleArtwork,
  })

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>
        <Separator />
        <LotInfo artwork={artwork} saleArtwork={artwork.saleArtwork} />
        <Separator />
        <BidForm
          saleArtwork={saleArtwork}
          onSubmit={(values, actions) => {
            alert(Object.keys(values))
            alert(Object.keys(actions))
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 2000)
          }}
        />
      </Box>
    </AppContainer>
  )
}

export const BidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(BidRoute),
  {}
)
