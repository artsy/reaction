import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ResponsiveImage } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

interface PriceProps {
  cents_usd: number
  display: string
}

export interface AuctionResultItemProps {
  title: string
  images: {
    thumbnail: {
      url: string
    }
  }
  organization: string
  description: string
  date_text: string
  sale_date_text: string
  dimension_text: string
  price_realized: PriceProps
  estimate: {
    display: string
  }
}

const getSalePrice = (price_realized: PriceProps) => {
  const salePrice =
    price_realized.cents_usd === 0 ? null : price_realized.display
  return salePrice
}

const getDescription = (fullDescription: string) => {
  const truncatedDescription = fullDescription.substr(0, 200)
  return truncatedDescription
}

export const AuctionResultItem: React.SFC<AuctionResultItemProps> = ({
  description,
  ...props
}) => {
  const truncatedDescription = getDescription(description)

  return (
    <Row>
      <Responsive>
        {({ xs, sm, md }) => {
          if (xs) {
            return (
              <ExtraSmallAuctionItem
                {...props}
                description={truncatedDescription}
              />
            )
          } else if (sm || md) {
            return (
              <SmallAuctionItem {...props} description={truncatedDescription} />
            )
          } else {
            return (
              <LargeAuctionItem {...props} description={truncatedDescription} />
            )
          }
        }}
      </Responsive>

      <Col>
        <Box pt={2} pb={1}>
          <Separator />
        </Box>
      </Col>
    </Row>
  )
}

const LargeAuctionItem: React.SFC<AuctionResultItemProps> = props => {
  const salePrice = getSalePrice(props.price_realized)

  return (
    <React.Fragment>
      <Col sm={1}>
        <Box maxWidth="70px" width="70px" height="auto">
          <ResponsiveImage src={props.images.thumbnail.url} />
        </Box>
      </Col>
      <Col sm={4}>
        <Box pl={1} pr={2}>
          <Serif size="2" italic>
            {props.title && props.title + ","}
            {props.date_text}
          </Serif>
          <Serif size="2">{props.dimension_text}</Serif>
          <Spacer pt={1} />
          <Serif size="1" color="black60">
            {props.description}
          </Serif>
        </Box>
      </Col>
      <Col sm={3}>
        <Box pt={1} pr={2}>
          <Serif size="2">{props.organization}</Serif>
          <Serif size="2" color="black60">
            {props.sale_date_text}
          </Serif>
          <Serif size="2" color="black60">
            <a href="#">Full description</a>
          </Serif>
        </Box>
      </Col>
      <Col sm={4}>
        {salePrice && <Serif size="2">{`Sale: ${salePrice}`}</Serif>}
        <Serif size="2" color="black60">
          Est: {props.estimate.display}
        </Serif>
      </Col>
    </React.Fragment>
  )
}

const SmallAuctionItem: React.SFC<AuctionResultItemProps> = props => {
  const salePrice = getSalePrice(props.price_realized)

  return (
    <React.Fragment>
      <Col sm={6}>
        <Flex>
          <Box maxWidth="70px" width="70px" height="auto">
            <ResponsiveImage src={props.images.thumbnail.url} />
          </Box>

          <Spacer mr={2} />

          <Box pr={6}>
            <Serif size="2" italic>
              {props.title && props.title + ","}
              {props.date_text}
            </Serif>
            <Serif size="2">{props.dimension_text}</Serif>
            <Spacer pt={1} />
            <Serif size="1" color="black60">
              {props.description}
            </Serif>
          </Box>
        </Flex>
      </Col>
      <Col sm={6}>
        {salePrice && <Serif size="2">Sale: {salePrice}</Serif>}

        <Serif size="2" color="black60">
          Est: {props.estimate.display}
        </Serif>
      </Col>
    </React.Fragment>
  )
}

const ExtraSmallAuctionItem: React.SFC<AuctionResultItemProps> = props => {
  const salePrice = getSalePrice(props.price_realized)

  return (
    <React.Fragment>
      <Col>
        <Flex>
          <Box maxWidth="30px" width="30px" height="auto">
            <ResponsiveImage src={props.images.thumbnail.url} />
          </Box>

          <Spacer mr={2} />

          <Box>
            <Serif size="2" italic>
              {props.title && props.title + ","}
              {props.date_text}
            </Serif>
            <Serif size="2">{props.dimension_text}</Serif>

            <Spacer pb={1} />

            <Serif size="2">{props.organization}</Serif>
            <Serif size="2" color="black60">
              {props.sale_date_text}
            </Serif>

            <Spacer pb={1} />

            {salePrice && <Serif size="2">Sale: {salePrice}</Serif>}

            <Serif size="2" color="black60">
              Est: {props.estimate.display}
            </Serif>
          </Box>
        </Flex>
      </Col>
    </React.Fragment>
  )
}
