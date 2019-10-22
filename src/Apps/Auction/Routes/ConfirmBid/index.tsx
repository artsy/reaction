import { Box, Separator, Serif } from "@artsy/palette"
import {
  ConfirmBidCreateBidderPositionMutation,
  ConfirmBidCreateBidderPositionMutationResponse,
} from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"
import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import { BidFormFragmentContainer as BidForm } from "Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "Apps/Auction/Components/LotInfo"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { FormikActions } from "formik"
import qs from "qs"
import React from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { data as sd } from "sharify"
import { get } from "Utils/get"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/ConfirmBid")

interface BidProps {
  artwork: routes_ConfirmBidQueryResponse["artwork"]
  me: routes_ConfirmBidQueryResponse["me"]
  relay: RelayProp
  location: Location
}

export const ConfirmBidRoute: React.FC<BidProps> = props => {
  const { me, artwork } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
  logger.log({
    me,
    sale,
    artwork,
    saleArtwork,
  })

  function createBidderPosition(maxBidAmountCents: number) {
    return new Promise(async (resolve, reject) => {
      commitMutation<ConfirmBidCreateBidderPositionMutation>(
        props.relay.environment,
        {
          onCompleted: data => {
            resolve(data)
          },
          onError: error => {
            reject(error)
          },
          mutation: graphql`
            mutation ConfirmBidCreateBidderPositionMutation(
              $input: BidderPositionInput!
            ) {
              createBidderPosition(input: $input) {
                result {
                  status
                  message_header
                  message_description_md
                }
              }
            }
          `,
          variables: {
            input: {
              sale_id: sale.id,
              artwork_id: artwork.id,
              max_bid_amount_cents: maxBidAmountCents,
            },
          },
        }
      )
    })
  }

  function handleMutationError(actions: FormikActions<object>, error: Error) {
    logger.error(error)

    let errorMessages: string[]
    if (Array.isArray(error)) {
      errorMessages = error.map(e => e.message)
    } else if (typeof error === "string") {
      errorMessages = [error]
    } else if (error.message) {
      errorMessages = [error.message]
    }

    // TODO: add tracking with errorMessages
    logger.error(errorMessages) // remove once tracking is implemented

    actions.setSubmitting(false)
    actions.setStatus("submissionFailed")
  }

  function handleSubmit(
    values: { selectedBid: number },
    actions: FormikActions<object>
  ) {
    createBidderPosition(Number(values.selectedBid))
      .then((data: ConfirmBidCreateBidderPositionMutationResponse) => {
        // TODO: add tracking here
        window.location.assign(
          `${sd.APP_URL}/auction/${sale.id}/artwork/${artwork.id}`
        )
      })
      .catch(error => {
        handleMutationError(actions, error)
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>
        <Separator />
        <LotInfo artwork={artwork} saleArtwork={artwork.saleArtwork} />
        <Separator />
        <BidForm
          initialSelectedBid={getInitialSelectedBid(props.location)}
          showPricingTransparency={Boolean(/pt=1/.test(props.location.search))}
          saleArtwork={saleArtwork}
          onSubmit={handleSubmit}
        />
      </Box>
    </AppContainer>
  )
}

const getInitialSelectedBid = (location: Location): string | undefined => {
  return get(
    qs,
    querystring => querystring.parse(location.search.slice(1)).bid,
    undefined
  )
}

export const ConfirmBidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(ConfirmBidRoute),
  {}
)
