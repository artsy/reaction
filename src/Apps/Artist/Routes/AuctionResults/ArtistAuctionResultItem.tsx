import {
  ArrowDownIcon,
  ArrowUpIcon,
  BorderBox,
  Col,
  Collapse,
  Link,
  Row,
  Sans,
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

import { Box, Button, Flex, Image, Separator, Spacer } from "@artsy/palette"
import { get } from "Utils/get"

export interface Props extends SystemContextProps {
  auctionResult: ArtistAuctionResultItem_auctionResult
  mediator?: Mediator
  lastChild: boolean
}

const FullWidthBorderBox = styled(BorderBox)`
  display: block;
  padding: 0;
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
      {({ state, toggleDetails }: AuctionResultsState) => {
        return (
          <>
            <Media at="xs">
              <FullWidthBorderBox
                mb={2}
                onClick={() => toggleDetails(props.auctionResult)}
              >
                <Row height="120px" p={2}>
                  <ExtraSmallAuctionItem
                    {...props}
                    mediator={mediator}
                    user={user}
                  />
                </Row>
                <Box>{renderSmallCollapse(props, user, mediator)}</Box>
              </FullWidthBorderBox>
            </Media>

            <Media greaterThanOrEqual="sm">
              <FullWidthBorderBox
                mb={2}
                onClick={() => toggleDetails(props.auctionResult)}
              >
                <Box p={2} minHeight="120px">
                  <Row minHeight="80px">
                    <LargeAuctionItem
                      {...props}
                      mediator={mediator}
                      user={user}
                    />
                  </Row>
                </Box>
                <Box>{renderLargeCollapse(props, user, mediator)}</Box>
              </FullWidthBorderBox>
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
      images,
      date_text,
      organization,
      sale_date_text,
      title,
      mediumText,
    },
    salePrice,
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
                    {title}
                    {title && date_text && ", "}
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
            <Col sm={4}>
              <Flex alignItems="center" height="100%">
                <Flex width="90%" pr="10px" justifyContent="flex-end">
                  {renderPricing(salePrice, props.user, props.mediator, "lg")}
                </Flex>
                <Flex width="10%" justifyContent="flex-end">
                  <div>
                    {props.auctionResult !== state.selectedAuction && (
                      <ArrowDownIcon />
                    )}
                    {state.showDetails &&
                      props.auctionResult === state.selectedAuction && (
                        <ArrowUpIcon />
                      )}
                  </div>
                </Flex>
              </Flex>
            </Col>
          </>
        )
      }}
    </Subscribe>
  )
}

const ExtraSmallAuctionItem: SFC<Props> = props => {
  const {
    auctionResult: { images, date_text, sale_date_text, title },
    salePrice,
  } = getProps(props)
  const imageUrl = get(images, i => i.thumbnail.url, "")

  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state, toggleDetails }: AuctionResultsState) => {
        return (
          <>
            <Col xs="4">
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
            <Col xs="6">
              <Flex alignItems="center" width="100%" height="100%">
                <Box>
                  {renderPricing(salePrice, props.user, props.mediator, "xs")}
                  <Sans size="2" weight="medium" color="black60">
                    {title}
                    {title && date_text && ", "}
                    {date_text}
                  </Sans>
                  <Sans size="2" color="black60" mt="5px">
                    Sold on {sale_date_text}
                  </Sans>
                </Box>
              </Flex>
            </Col>
            <Col xs="2">
              <Flex
                justifyContent="flex-end"
                width="100%"
                alignItems="center"
                height="100%"
              >
                <div>
                  {props.auctionResult !== state.selectedAuction && (
                    <ArrowDownIcon />
                  )}
                  {state.showDetails &&
                    props.auctionResult === state.selectedAuction && (
                      <ArrowUpIcon />
                    )}
                </div>
              </Flex>
            </Col>
          </>
        )
      }}
    </Subscribe>
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

const renderPricing = (salePrice, user, mediator, size) => {
  const textSize = size === "xs" ? "2" : "3t"
  if (user) {
    const textAlign = size === "xs" ? "left" : "right"
    return (
      <Box textAlign={textAlign} mb="5px">
        {salePrice && (
          <>
            <Sans size={textSize} weight="medium" mb="2px">
              {salePrice}
            </Sans>
            {size !== "xs" && (
              <Sans size="2" color="black60">
                Realized price
              </Sans>
            )}
          </>
        )}
        {!salePrice && (
          <Box textAlign={textAlign}>
            <Sans mb="2px" size={textSize} weight="medium">
              Price not available
            </Sans>
          </Box>
        )}
      </Box>
    )
  } else {
    const btnSize = size === "xs" || "sm" ? "small" : "large"
    const buttonMargin = size === "xs" ? "10px" : "0px"
    return (
      <Button
        size={btnSize}
        variant="secondaryGray"
        mb={buttonMargin}
        onClick={() => {
          mediator &&
            mediator.trigger("open:auth", {
              mode: "register",
              copy: "Log in to see full auction records — for free",
            })
        }}
      >
        Log in to see price
      </Button>
    )
  }
}

const renderEstimate = (estimatedPrice, user, mediator, size) => {
  const justifyContent = size === "xs" ? "flex-start" : "flex-end"
  if (user) {
    return (
      <Flex justifyContent={justifyContent}>
        {estimatedPrice && (
          <>
            <Sans size="2">{estimatedPrice}</Sans>
          </>
        )}
        {!estimatedPrice && (
          <>
            <Sans size="2">Estimate not available</Sans>
          </>
        )}
      </Flex>
    )
  } else {
    return (
      <Link
        onClick={() => {
          mediator &&
            mediator.trigger("open:auth", {
              mode: "register",
              copy: "Sign up to see full auction records — for free",
            })
        }}
      >
        <Sans size="2">Log in to see estimate</Sans>
      </Link>
    )
  }
}

const renderRealizedPrice = (estimatedPrice, user, mediator, size) => {
  const justifyContent = size === "xs" ? "flex-start" : "flex-end"
  if (user) {
    return (
      <Flex justifyContent={justifyContent}>
        {estimatedPrice && (
          <>
            <Sans size="2">{estimatedPrice}</Sans>
          </>
        )}
        {!estimatedPrice && (
          <>
            <Sans size="2">Price not available</Sans>
          </>
        )}
      </Flex>
    )
  } else {
    return (
      <Link
        onClick={() => {
          mediator &&
            mediator.trigger("open:auth", {
              mode: "register",
              copy: "Sign up to see full auction records — for free",
            })
        }}
      >
        <Sans size="2">Log in to see realized price</Sans>
      </Link>
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
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)
  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state }: AuctionResultsState) => {
        return (
          <Collapse
            open={
              state.showDetails && props.auctionResult === state.selectedAuction
            }
          >
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
                <Col sm={4} pr="4.5%">
                  <Sans size="2">
                    {renderEstimate(estimatedPrice, user, mediator, "lg")}
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
                <Col sm={4} pr="4.5%">
                  {renderRealizedPrice(salePrice, user, mediator, "lg")}
                </Col>
              </Row>

              <Row>
                <Col sm={2}>
                  <Sans size="2" weight="medium">
                    Description
                  </Sans>
                </Col>
                <Col sm={10} pr="4.5%">
                  <Box pl={1}>
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

const renderSmallCollapse = (props, user, mediator) => {
  const {
    auctionResult: {
      dimension_text,
      description,
      organization,
      sale_date_text,
      categoryText,
      mediumText,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)
  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state }: AuctionResultsState) => {
        return (
          <Collapse
            open={
              state.showDetails && props.auctionResult === state.selectedAuction
            }
          >
            <Separator />
            <Box p={2}>
              <Row mb={2}>
                <Col xs={4}>
                  <Sans size="2" weight="medium">
                    Artwork Info
                  </Sans>
                </Col>
                <Col xs={8}>
                  <Box>
                    <Sans size="2">{categoryText}</Sans>
                    <Sans size="2">{mediumText}</Sans>
                    <Sans size="2">{dimension_text}</Sans>
                  </Box>
                </Col>
              </Row>
              <Row mb={2}>
                <Col xs={4}>
                  <Sans size="2" weight="medium">
                    Estimate
                  </Sans>
                </Col>
                <Col xs={8}>
                  {renderEstimate(estimatedPrice, user, mediator, "xs")}
                </Col>
              </Row>

              <Row mb={2}>
                <Col xs={4}>
                  <Sans size="2" weight="medium">
                    Realized Price
                  </Sans>
                </Col>
                <Col xs={8}>
                  {renderRealizedPrice(salePrice, user, mediator, "xs")}
                </Col>
              </Row>

              <Row mb={2}>
                <Col xs={4}>
                  <Sans size="2" weight="medium">
                    Auction Sale
                  </Sans>
                </Col>
                <Col xs={8}>
                  <Sans size="2">{sale_date_text}</Sans>
                  <Sans size="2">{organization}</Sans>
                </Col>
              </Row>

              <Row mb={2}>
                <Col xs={4}>
                  <Sans size="2" weight="medium">
                    Description
                  </Sans>
                </Col>
                <Col xs={8}>
                  <Sans size="2">{description}</Sans>
                </Col>
              </Row>
            </Box>
          </Collapse>
        )
      }}
    </Subscribe>
  )
}
