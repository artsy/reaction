import { Serif } from "@artsy/palette"
import { AuctionResultItem_auctionResult } from "__generated__/AuctionResultItem_auctionResult.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ResponsiveImage } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Subscribe } from "unstated"
import { AuctionResultsStateContainer } from "./AuctionResultsState"

export interface Props {
  auctionResult: AuctionResultItem_auctionResult
}

export const AuctionResultItem: React.SFC<Props> = (props: Props) => {
  return (
    <Row>
      <Responsive>
        {({ xs, sm, md }) => {
          if (xs) {
            return <ExtraSmallAuctionItem {...props} />
          } else if (sm || md) {
            return <SmallAuctionItem {...props} />
          } else {
            return <LargeAuctionItem {...props} />
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

const LargeAuctionItem: React.SFC<Props> = (props: Props) => {
  const salePrice = getSalePrice(props.auctionResult.price_realized)
  const truncatedDescription = getDescription(props.auctionResult.description)

  return (
    <Subscribe to={[AuctionResultsStateContainer]}>
      {({ state, showDetailsModal }: AuctionResultsStateContainer) => {
        return (
          <React.Fragment>
            <Col sm={1}>
              <Box maxWidth="70px" width="70px" height="auto">
                <ResponsiveImage
                  src={props.auctionResult.images.thumbnail.url}
                />
              </Box>
            </Col>
            <Col sm={4}>
              <Box pl={1} pr={2}>
                <Serif size="2" italic>
                  {props.auctionResult.title && props.auctionResult.title + ","}
                  {props.auctionResult.date_text}
                </Serif>
                <Serif size="2">{props.auctionResult.dimension_text}</Serif>
                <Spacer pt={1} />
                <Serif size="1" color="black60">
                  {truncatedDescription}
                </Serif>
              </Box>
            </Col>
            <Col sm={3}>
              <Box pt={1} pr={2}>
                <Serif size="2">{props.auctionResult.organization}</Serif>
                <Serif size="2" color="black60">
                  {props.auctionResult.sale_date_text}
                </Serif>
                <Serif size="2" color="black60">
                  <span onClick={() => showDetailsModal(props)}>
                    Full description
                  </span>
                </Serif>
              </Box>
            </Col>
            <Col sm={4}>
              {salePrice && <Serif size="2">{`Sale: ${salePrice}`}</Serif>}
              <Serif size="2" color="black60">
                Est: {props.auctionResult.estimate.display}
              </Serif>
            </Col>
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

const SmallAuctionItem: React.SFC<Props> = props => {
  const salePrice = getSalePrice(props.auctionResult.price_realized)
  const truncatedDescription = getDescription(props.auctionResult.description)

  return (
    <React.Fragment>
      <Col sm={6}>
        <Flex>
          <Box maxWidth="70px" width="70px" height="auto">
            <ResponsiveImage src={props.auctionResult.images.thumbnail.url} />
          </Box>

          <Spacer mr={2} />

          <Box pr={6}>
            <Serif size="2" italic>
              {props.auctionResult.title && props.auctionResult.title + ","}
              {props.auctionResult.date_text}
            </Serif>
            <Serif size="2">{props.auctionResult.dimension_text}</Serif>
            <Spacer pt={1} />
            <Serif size="1" color="black60">
              {truncatedDescription}
            </Serif>
          </Box>
        </Flex>
      </Col>
      <Col sm={6}>
        {salePrice && <Serif size="2">Sale: {salePrice}</Serif>}

        <Serif size="2" color="black60">
          Est: {props.auctionResult.estimate.display}
        </Serif>
      </Col>
    </React.Fragment>
  )
}

const ExtraSmallAuctionItem: React.SFC<Props> = props => {
  const salePrice = getSalePrice(props.auctionResult.price_realized)

  return (
    <React.Fragment>
      <Col>
        <Flex>
          <Box maxWidth="30px" width="30px" height="auto">
            <ResponsiveImage src={props.auctionResult.images.thumbnail.url} />
          </Box>

          <Spacer mr={2} />

          <Box>
            <Serif size="2" italic>
              {props.auctionResult.title && props.auctionResult.title + ","}
              {props.auctionResult.date_text}
            </Serif>
            <Serif size="2">{props.auctionResult.dimension_text}</Serif>

            <Spacer pb={1} />

            <Serif size="2">{props.auctionResult.organization}</Serif>
            <Serif size="2" color="black60">
              {props.auctionResult.sale_date_text}
            </Serif>

            <Spacer pb={1} />

            {salePrice && <Serif size="2">Sale: {salePrice}</Serif>}

            <Serif size="2" color="black60">
              Est: {props.auctionResult.estimate.display}
            </Serif>
          </Box>
        </Flex>
      </Col>
    </React.Fragment>
  )
}

export const AuctionResultItemFragmentContainer = createFragmentContainer(
  AuctionResultItem,
  graphql`
    fragment AuctionResultItem_auctionResult on AuctionResult {
      title
      dimension_text
      organization
      images {
        thumbnail {
          url
        }
      }
      description
      date_text
      sale_date_text
      price_realized {
        display
        cents_usd
      }
      estimate {
        display
      }
    }
  `
)

// Helpers

const getSalePrice = price_realized => {
  const salePrice =
    price_realized.cents_usd === 0 ? null : price_realized.display
  return salePrice
}

const getDescription = (fullDescription: string) => {
  const truncatedDescription = fullDescription.substr(0, 200)
  return truncatedDescription
}
