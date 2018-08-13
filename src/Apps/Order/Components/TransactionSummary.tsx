import { Serif, space } from "@artsy/palette"
import React from "react"
import { media } from "styled-bootstrap-grid"
import { BorderBox, Box } from "Styleguide/Elements/Box"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import styled from "../../../../node_modules/styled-components"

const SummaryContainer = styled(Flex)`
  margin: ${space(2)}px;
  ${media.sm`
  margin: ${space(3)}px;
`};
`

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
    <BorderBox p={0} flexDirection="column" {...others}>
      <SummaryContainer flexDirection="row">
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
      </SummaryContainer>
      <Separator />
      <SummaryContainer flexDirection="column">
        <Entry label="Price" value={price} />
        <Entry label="Shipping" value={shipping} />
        <Entry label="Tax" value={tax} />
        <Spacer mb={2} />
        <Entry label="Total" value={total} final />
      </SummaryContainer>
    </BorderBox>
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
