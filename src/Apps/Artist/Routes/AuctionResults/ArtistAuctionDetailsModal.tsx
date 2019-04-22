import { Modal } from "Components/Modal/Modal"
import React, { SFC } from "react"
import { Subscribe } from "unstated"
import { AuctionResultsState } from "./state"

import {
  Box,
  Button,
  Flex,
  Image,
  Sans,
  Separator,
  Serif,
  Spacer,
} from "@artsy/palette"
import { get } from "Utils/get"

interface Props {
  hideDetailsModal?: () => void
  auctionResult: {
    title: string
    date_text: string
    dimension_text: string
    images: {
      thumbnail: {
        url: string
      }
    }
    description: string
  }
}

export const ArtistAuctionDetailsModal: SFC<Props> = props => {
  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state, hideDetailsModal }: AuctionResultsState) => {
        if (!state.showModal) {
          return null
        }

        return (
          <Modal
            onClose={() => hideDetailsModal()}
            show={state.showModal}
            style={{
              maxHeight: 540,
              overflowX: "scroll",
            }}
          >
            <LotDetails
              auctionResult={state.selectedAuction.auctionResult}
              hideDetailsModal={hideDetailsModal}
            />
          </Modal>
        )
      }}
    </Subscribe>
  )
}

const LotDetails: SFC<Props> = props => {
  const {
    hideDetailsModal,
    auctionResult: { title, date_text, dimension_text, images, description },
  } = props
  const imageUrl = get(images, i => i.thumbnail.url, "")

  return (
    <>
      <Flex justifyContent="center">
        <Serif size="5t" weight="semibold">
          Lot description
        </Serif>
      </Flex>

      <Spacer mb={4} />

      <Flex>
        <Box>
          <Serif size="2" italic>
            {title && title + ","}
            {date_text}
          </Serif>
          <Serif size="2" color="black60">
            {dimension_text}
          </Serif>
        </Box>

        <Spacer mr={2} />

        <Box height="auto">
          <Image width="100px" src={imageUrl} />
        </Box>
      </Flex>

      <Box my={3}>
        <Separator />
      </Box>

      <Box mb={1}>
        <Sans size="2" weight="medium">
          Description
        </Sans>
      </Box>

      <Serif size="2">{description}</Serif>
      <Spacer mb={4} />

      <Button
        variant="secondaryOutline"
        width="100%"
        onClick={() => hideDetailsModal()}
      >
        OK
      </Button>
    </>
  )
}
