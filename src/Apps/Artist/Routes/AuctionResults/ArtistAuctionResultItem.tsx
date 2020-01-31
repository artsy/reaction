import {
  ArrowDownIcon,
  ArrowUpIcon,
  BorderBox,
  Col,
  Collapse,
  Row,
  Sans,
  StackableBorderBox,
} from "@artsy/palette"
import { ArtistAuctionResultItem_auctionResult } from "__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { SystemContextProps } from "Artsy"
import { Mediator, SystemContext } from "Artsy"
import React, { SFC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive"
import { AuctionResultsState } from "./state"

import {
  Box,
  Button,
  Flex,
  Image,
  Separator,
  Serif,
  Spacer,
} from "@artsy/palette"
import { get } from "Utils/get"

export interface Props extends SystemContextProps {
  auctionResult: ArtistAuctionResultItem_auctionResult
  mediator?: Mediator
  lastChild: boolean
}

const FullWidthBox = styled(Box)`
  width: 100%;
  display: block;
`

const FullWidthBorderBox = styled(BorderBox)`
  display: block;
  padding: 0;
`

const FloatRight = styled(Flex)`
  float: right;
`

const StyledImage = styled(Image)`
  max-height: 100%;
  max-width: 100%;
`

// TODO: This whole component should be refactored to use less `Media` decisions
export const ArtistAuctionResultItem: SFC<Props> = props => {
  const { user, mediator } = useContext(SystemContext)
  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state }: AuctionResultsState) => {
        return (
          <>
            <Media at="xs">
              {(className, renderChildren) => (
                <Row className={className}>
                  {renderChildren && (
                    <ExtraSmallAuctionItem
                      {...props}
                      mediator={mediator}
                      user={user}
                    />
                  )}
                </Row>
              )}
            </Media>
            <Media greaterThanOrEqual="sm">
              {(className, renderChildren) => (
                <FullWidthBorderBox mb={2}>
                  <Box p={2} height="120px">
                    <Row height="80px" className={className}>
                      {renderChildren && (
                        <LargeAuctionItem
                          {...props}
                          mediator={mediator}
                          user={user}
                        />
                      )}
                    </Row>
                  </Box>
                  <Box>{renderLargeCollapse(props, user, mediator)}</Box>
                </FullWidthBorderBox>
              )}
            </Media>
            <Spacer />
          </>
        )
      }}
    </Subscribe>
  )
}

const LargeAuctionItem: SFC<Props> = props => {
  const {
    auctionResult: {
      dimension_text,
      currency,
      images,
      date_text,
      organization,
      sale_date_text,
      title,
      mediumText,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)

  const imageUrl = get(images, i => i.thumbnail.url, "")
  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state, toggleDetails }: AuctionResultsState) => {
        return (
          <>
            <Col sm={2}>
              <Flex
                alignItems="center"
                justifyContent="center"
                height="80px"
                width="80px"
                pr={2}
              >
                <StyledImage src={imageUrl} preventRightClick />
              </Flex>
            </Col>
            <Col sm={4}>
              <Flex alignItems="center" height="100%" pl={1} pr={6}>
                <div>
                  <Sans size="3" weight="medium">
                    {title && title + ", "}
                    {date_text}
                  </Sans>
                  <Sans size="2" color="black60">
                    {mediumText}
                  </Sans>
                  <Spacer pt={1} />
                </div>
              </Flex>
            </Col>
            <Col sm={2}>
              <Flex alignItems="center" height="100%" pr={2}>
                <div>
                  <Sans size="3" weight="medium">
                    {sale_date_text}
                  </Sans>
                  <Sans size="2" color="black60">
                    {organization}
                  </Sans>
                </div>
              </Flex>
            </Col>
            <Col sm={3}>
              <FloatRight alignItems="center" height="100%">
                {renderPricing(
                  salePrice,
                  currency,
                  props.user,
                  props.mediator,
                  "lg"
                )}
              </FloatRight>
            </Col>
            <Col sm={1}>
              <FloatRight alignItems="center" height="100%">
                <div onClick={() => toggleDetails(props)}>
                  {!state.showDetails && <ArrowDownIcon />}
                  {state.showDetails && <ArrowUpIcon />}
                </div>
              </FloatRight>
            </Col>
          </>
        )
      }}
    </Subscribe>
  )
}

const ExtraSmallAuctionItem: SFC<Props> = props => {
  const {
    auctionResult: {
      dimension_text,
      images,
      date_text,
      organization,
      sale_date_text,
      title,
      currency,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)
  const imageUrl = get(images, i => i.thumbnail.url, "")

  return (
    <>
      <Col>
        <Flex>
          <Box height="auto">
            <Image width="70px" src={imageUrl} preventRightClick />
          </Box>

          <Spacer mr={2} />

          <Box>
            <Serif size="2" italic>
              {title && title + ","}
              {date_text}
            </Serif>
            <Serif size="2">{dimension_text}</Serif>

            <Spacer pb={1} />

            <Serif size="2">{organization}</Serif>
            <Serif size="2" color="black60">
              {sale_date_text}
            </Serif>

            <Spacer pb={1} />
            {renderPricing(
              salePrice,
              currency,
              props.user,
              props.mediator,
              "xs"
            )}
          </Box>
        </Flex>
      </Col>
    </>
  )
}

export const AuctionResultItemFragmentContainer = createFragmentContainer(
  ArtistAuctionResultItem,
  {
    auctionResult: graphql`
      fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
        title
        dimension_text: dimensionText
        organization
        images {
          thumbnail {
            url
          }
        }
        mediumText
        categoryText
        description
        currency
        date_text: dateText
        sale_date_text: saleDateText
        price_realized: priceRealized {
          display
          cents_usd: centsUSD
        }
        estimate {
          display
        }
      }
    `,
  }
)

const FullDescriptionLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

FullDescriptionLink.displayName = "FullDescriptionLink"

// Helpers

const getSalePrice = price_realized => {
  const salePrice =
    price_realized.cents_usd === 0 ? null : price_realized.display
  return salePrice
}

const getProps = (props: Props) => {
  const {
    auctionResult: { estimate, price_realized },
  } = props

  const salePrice = getSalePrice(price_realized)
  const estimatedPrice = estimate.display

  return {
    ...props,
    salePrice,
    estimatedPrice,
  }
}

const renderPricing = (salePrice, currency, user, mediator, size) => {
  if (user) {
    return (
      <Box textAlign="right">
        {salePrice && (
          <>
            <Sans size="3" weight="medium">
              {salePrice + " "}
              {currency}
            </Sans>
            <Sans size="2" color="black60">
              Realized price
            </Sans>
          </>
        )}
        {!salePrice && (
          <Box textAlign="right">
            <Sans size="3" weight="medium">
              Price not available
            </Sans>
          </Box>
        )}
      </Box>
    )
  } else {
    const btnSize = size === "xs" || "sm" ? "small" : "large"
    return (
      <Button
        size={btnSize}
        variant="secondaryOutline"
        onClick={() => {
          mediator &&
            mediator.trigger("open:auth", {
              mode: "register",
              copy: "Sign up to see full auction records — for free",
            })
        }}
      >
        Sign up to see price
      </Button>
    )
  }
}

const renderLargeCollapse = (props, user, mediator) => {
  const {
    auctionResult: {
      dimension_text,
      description,
      organization,
      sale_date_text,
      categoryText,
      currency,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)
  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state }: AuctionResultsState) => {
        return (
          <Collapse open={state.showDetails}>
            <Separator />
            <Box p={2}>
              <Row>
                <Col sm={2}>
                  <Sans size="2" weight="medium">
                    Artwork Info
                  </Sans>
                </Col>
                <Col sm={4}>
                  <Box pl={1} pr={6}>
                    <Sans size="2">{categoryText}</Sans>
                    <Sans size="2">{dimension_text}</Sans>
                    <Spacer pt={1} />
                  </Box>
                </Col>
                <Col sm={2}>
                  <Box pr={2}>
                    <Sans size="2" weight="medium">
                      Estimate
                    </Sans>
                  </Box>
                </Col>
                <Col sm={4}>
                  <Sans size="2">
                    {estimatedPrice + " "}
                    {currency}
                  </Sans>
                </Col>
              </Row>

              <Row>
                <Col sm={2}>
                  <Sans size="2" weight="medium">
                    Auction Sale
                  </Sans>
                </Col>
                <Col sm={4}>
                  <Box pl={1} pr={6}>
                    <Sans size="2">{sale_date_text}</Sans>
                    <Sans size="2">{organization}</Sans>
                    <Spacer pt={1} />
                  </Box>
                </Col>

                <Col sm={2}>
                  <Box pr={2}>
                    <Sans size="2" weight="medium">
                      Realized Price
                    </Sans>
                  </Box>
                </Col>
                <Col sm={4}>
                  {salePrice && (
                    <Sans size="2">
                      {salePrice + " "}
                      {currency}
                    </Sans>
                  )}
                  {!salePrice && <Sans size="2">Price not available</Sans>}
                  <Sans size="2">Percentage</Sans>
                </Col>
              </Row>

              <Row>
                <Col sm={2}>
                  <Sans size="2" weight="medium">
                    Description
                  </Sans>
                </Col>
                <Col sm={10}>
                  <Box pl={1} pr={6}>
                    <Sans size="2">{description}</Sans>
                  </Box>
                </Col>
              </Row>
            </Box>
          </Collapse>
        )
      }}
    </Subscribe>
  )
}
