import { Box, Flex, Image, Separator, Serif } from "@artsy/palette"
import { Bid_artwork } from "__generated__/Bid_artwork.graphql"
import { Bid_me } from "__generated__/Bid_me.graphql"
import { Bid_sale } from "__generated__/Bid_sale.graphql"
import { BidCreateBidderMutation } from "__generated__/BidCreateBidderMutation.graphql"
import { BidCreateBidderPositionMutation } from "__generated__/BidCreateBidderPositionMutation.graphql"
import { BidForm } from "Apps/Auction/Components/BidForm"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { FormikActions } from "formik"
import React, { useState } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { data as sd } from "sharify"
import createLogger from "Utils/logger"
import { FormValues } from "../../Components/BidForm"

const logger = createLogger("Apps/Auction/Routes/Bid")

interface BidProps {
  artwork: Bid_artwork
  sale: Bid_sale
  me: Bid_me
  relay?: RelayProp
}

export const BidRoute: React.FC<BidProps> = props => {
  const { relay, sale, artwork } = props
  const [showErrorModal, setShowErrorModal] = useState(false)

  function createBidder() {
    return new Promise(async (resolve, reject) => {
      commitMutation<BidCreateBidderMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          resolve()
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation BidCreateBidderMutation($input: CreateBidderInput!) {
            createBidder(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: { sale_id: sale.id },
        },
      })
    })
  }

  function createBidderPosition(values: FormValues) {
    return new Promise(async (resolve, reject) => {
      commitMutation<BidCreateBidderPositionMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          resolve()
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation BidCreateBidderPositionMutation(
            $input: BidderPositionInput!
          ) {
            createBidderPosition(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: {
            sale_id: sale.id,
            artwork_id: artwork.id,
            max_bid_amount_cents: parseFloat(values.maxBidAmountCents),
          },
        },
      })
    })
  }

  function onSubmit(values: FormValues, actions: FormikActions<object>) {
    const { setSubmitting } = actions

    createBidder()
      .then(() => {
        createBidderPosition(values).then(() => {
          setSubmitting(false)

          window.location.href = `${sd.APP_URL}/artwork/${artwork.id}`
        })
      })
      .catch(error => {
        logger.error(error)

        setSubmitting(false)
        setShowErrorModal(true)
      })
  }

  return (
    <AppContainer>
      <Box maxWidth={550} px={[2, 0]} mx="auto" my={[1, 0]}>
        <Serif size="10">Confirm your bid</Serif>
        <Separator mt={1} mb={4} />
        <Flex mt={2}>
          <Flex flexBasis="25%" flexGrow="2" mr={1}>
            <Image width={150} height={150} src={artwork.imageUrl} />
          </Flex>
          <Flex flexBasis="75%" flexGrow="2" mr={1}>
            <Box pt={1} pl={2}>
              <Serif weight="semibold" size="2">
                Lot 6
              </Serif>
              <Serif element="span" italic size="3t">
                {artwork.displayLabel}
              </Serif>
              <Serif element="span" size="3t">
                , 1992
              </Serif>
              <Serif size="3t">{artwork.artist_names}</Serif>
              <Serif mt={2} size="3t">
                Starting bid: $8000
              </Serif>
            </Box>
          </Flex>
        </Flex>
        <Separator mt={4} mb={4} />
        <BidForm onSubmit={onSubmit} />
      </Box>
      <ErrorModal
        show={showErrorModal}
        onClose={() => {
          setShowErrorModal(false)
        }}
      />
    </AppContainer>
  )
}

export const BidFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(BidRoute),
  {
    artwork: graphql`
      fragment Bid_artwork on Artwork {
        id
        imageUrl
        artist_names
        displayLabel
      }
    `,
    sale: graphql`
      fragment Bid_sale on Sale {
        id
        registrationStatus {
          qualified_for_bidding
        }
      }
    `,
    me: graphql`
      fragment Bid_me on Me {
        has_qualified_credit_cards
      }
    `,
  }
)
