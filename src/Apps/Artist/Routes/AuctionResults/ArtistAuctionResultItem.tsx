import { ArtistAuctionResultItem_auctionResult } from "__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive/Media2"
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
import { Mediator } from "Artsy/SystemContext"

export interface Props extends ContextProps {
  auctionResult: ArtistAuctionResultItem_auctionResult
  mediator?: Mediator
  lastChild: boolean
  user: User
}

export class ArtistAuctionResultItem extends Component<Props> {
  render() {
    const { lastChild } = this.props
    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Row>
              <Media at="xs">
                <ExtraSmallAuctionItem
                  {...this.props}
                  mediator={mediator}
                  user={user}
                />
              </Media>
              <Media between={["sm", "lg"]}>
                <SmallAuctionItem
                  {...this.props}
                  mediator={mediator}
                  user={user}
                />
              </Media>
              <Media greaterThanOrEqual="lg">
                <LargeAuctionItem
                  {...this.props}
                  mediator={mediator}
                  user={user}
                />
              </Media>
              <Col>
                <Box pt={2} pb={1}>
                  {!lastChild && <Separator />}
                </Box>
              </Col>
            </Row>
          )
        }}
      </ContextConsumer>
    )
  }
}

const LargeAuctionItem = class extends React.Component<Props> {
  render() {
    const {
      auctionResult: {
        dimension_text,
        images,
        date_text,
        organization,
        sale_date_text,
        title,
      },
      salePrice,
      truncatedDescription,
      estimatedPrice,
    } = getProps(this.props)

    return (
      <Subscribe to={[AuctionResultsState]}>
        {({ state, showDetailsModal }: AuctionResultsState) => {
          return (
            <>
              <Col sm={1}>
                <Box height="auto" pr={2}>
                  <Image width="70px" src={images.thumbnail.url} />
                </Box>
              </Col>
              <Col sm={4}>
                <Box pl={1} pr={6}>
                  <Serif size="2" italic>
                    {title && title + ","}
                    {date_text}
                  </Serif>
                  <Serif size="2">{dimension_text}</Serif>
                  <Spacer pt={1} />
                  <Serif size="1" color="black60">
                    {truncatedDescription}
                  </Serif>
                </Box>
              </Col>
              <Col sm={3}>
                <Box pr={2}>
                  <Serif size="2">{organization}</Serif>
                  <Serif size="2" color="black60">
                    {sale_date_text}
                  </Serif>
                  <Serif size="2" color="black60">
                    <FullDescriptionLink
                      onClick={() => showDetailsModal(this.props)}
                    >
                      Full description
                    </FullDescriptionLink>
                  </Serif>
                </Box>
              </Col>
              <Col sm={4}>
                {renderPricing(
                  salePrice,
                  estimatedPrice,
                  this.props.user,
                  this.props.mediator,
                  "lg"
                )}
              </Col>
            </>
          )
        }}
      </Subscribe>
    )
  }
}

const SmallAuctionItem = class extends React.Component<Props> {
  render() {
    const {
      auctionResult: { dimension_text, images, date_text, title },
      salePrice,
      truncatedDescription,
      estimatedPrice,
    } = getProps(this.props)

    return (
      <>
        <Col sm={6}>
          <Flex>
            <Box height="auto">
              <Image width="70px" src={images.thumbnail.url} />
            </Box>

            <Spacer mr={2} />

            <Box pr={4}>
              <Serif size="2" italic>
                {title && title + ","}
                {date_text}
              </Serif>
              <Serif size="2">{dimension_text}</Serif>
              <Spacer pt={1} />
              <Serif size="1" color="black60">
                {truncatedDescription}
              </Serif>
            </Box>
          </Flex>
        </Col>
        <Col sm={6}>
          {renderPricing(
            salePrice,
            estimatedPrice,
            this.props.user,
            this.props.mediator,
            "sm"
          )}
        </Col>
      </>
    )
  }
}

const ExtraSmallAuctionItem = class extends React.Component<Props> {
  render() {
    const {
      auctionResult: {
        dimension_text,
        images,
        date_text,
        organization,
        sale_date_text,
        title,
      },
      salePrice,
      estimatedPrice,
    } = getProps(this.props)

    return (
      <>
        <Col>
          <Flex>
            <Box height="auto">
              <Image width="70px" src={images.thumbnail.url} />
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
                estimatedPrice,
                this.props.user,
                this.props.mediator,
                "xs"
              )}
            </Box>
          </Flex>
        </Col>
      </>
    )
  }
}

export const AuctionResultItemFragmentContainer = createFragmentContainer(
  ArtistAuctionResultItem,
  graphql`
    fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
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

const FullDescriptionLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

// Helpers

const getSalePrice = price_realized => {
  const salePrice =
    price_realized.cents_usd === 0 ? null : price_realized.display
  return salePrice
}

const getDescription = (fullDescription: string) => {
  let truncatedDescription
  if (fullDescription) {
    truncatedDescription = fullDescription.substr(0, 200)
    return truncatedDescription + "..."
  }
  return truncatedDescription
}

const getProps = props => {
  const {
    auctionResult: { description, estimate, price_realized },
  } = props

  const salePrice = getSalePrice(price_realized)
  const truncatedDescription = getDescription(description)
  const estimatedPrice = estimate.display

  return {
    ...props,
    salePrice,
    truncatedDescription,
    estimatedPrice,
  }
}

const renderPricing = (salePrice, estimatedPrice, user, mediator, size) => {
  if (user) {
    return (
      <>
        {salePrice && <Serif size="2">{`Sale: ${salePrice}`}</Serif>}
        {estimatedPrice && (
          <Serif size="2" color="black60">
            Est: {estimatedPrice}
          </Serif>
        )}
      </>
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
