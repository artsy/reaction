import { Serif } from "@artsy/palette"
import React from "react"
import { Box, StackableBorderBox } from "Styleguide/Elements/Box"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"

export interface TransactionSummaryProps extends FlexProps {
  price: string
  shipping: string
  tax: string
  total: string
  artistName: string
  artworkName: string
  sellerName: string
  artworkLocation: string
  imageURL: string
}

export const TransactionSummary: React.SFC<TransactionSummaryProps> = ({
  price,
  shipping,
  tax,
  total,
  artistName,
  artworkName,
  sellerName,
  artworkLocation,
  imageURL,
  ...others
}) => {
  return (
    <Flex flexDirection="column" {...others}>
      <StackableBorderBox flexDirection="row">
        <Box height="auto">
          <Image src={imageURL} width="55px" mr={1} />
        </Box>
        <Flex flexDirection="column">
          <Serif size="2" weight="semibold" color="black60">
            {artistName}
          </Serif>
          <Serif italic size="2" color="black60">
            {artworkName}
          </Serif>
          <Serif size="2" color="black60">
            {sellerName}
          </Serif>
          <Serif size="2" color="black60">
            {artworkLocation}
          </Serif>
        </Flex>
      </StackableBorderBox>
      <StackableBorderBox flexDirection="column">
        <Entry label="Price" value={price} />
        <Entry label="Shipping" value={shipping} />
        <Entry label="Tax" value={tax} />
        <Spacer mb={2} />
        <Entry label="Total" value={total} final />
      </StackableBorderBox>
    </Flex>
  )
}

const Entry = ({
  label,
  value,
  final,
}: {
  label: React.ReactNode
  value: React.ReactNode
  final?: boolean
}) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Serif size="2" color="black60">
        {label}
      </Serif>
    </div>
    <div>
      <Serif
        size="2"
        color={final ? "black100" : "black60"}
        weight={final ? "semibold" : "regular"}
      >
        {value}
      </Serif>
    </div>
  </Flex>
)
