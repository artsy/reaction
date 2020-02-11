import { Modal } from "Components/Modal/Modal"
import React, { SFC } from "react"

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
import { useAuctionResultsFilterContext } from "./AuctionResultsFilterContext"

interface Props {
  auctionResult?: {
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
  const filterContext = useAuctionResultsFilterContext()

  if (filterContext.filters.openedItemIndex === null) {
    return null
  }

  return (
    <Modal
      onClose={() => filterContext.onAuctionResultClick(null)}
      show
      style={{
        maxHeight: 540,
        overflowX: "scroll",
      }}
    >
      <LotDetails auctionResult={props.auctionResult} />
    </Modal>
  )
}

const LotDetails: SFC<Props> = props => {
  const {
    auctionResult: { title, date_text, dimension_text, images, description },
  } = props
  const filterContext = useAuctionResultsFilterContext()

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
          <Image width="100px" src={imageUrl} preventRightClick />
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
        onClick={() => filterContext.onAuctionResultClick(null)}
      >
        OK
      </Button>
    </>
  )
}
