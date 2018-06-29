import { Serif } from "@artsy/palette"
import { AuctionResultItem_auctionResult } from "__generated__/AuctionResultItem_auctionResult.graphql"
import { ContextProps } from "Components/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GlobalState } from "Router/state"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Image } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Subscribe } from "unstated"
import { AuctionResultsStateContainer } from "./AuctionResultsState"

export interface Props extends ContextProps {
  auctionResult: AuctionResultItem_auctionResult
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class AuctionResultItem extends React.Component<Props> {
  render() {
    return (
      <Subscribe to={[GlobalState]}>
        {({ state }) => {
          return (
            <Row>
              <Responsive>
                {({ xs, sm, md }) => {
                  if (xs) {
                    return (
                      <ExtraSmallAuctionItem
                        mediator={state.force && state.force.mediator}
                        {...this.props}
                        currentUser={state.system.currentUser}
                      />
                    )
                  } else if (sm || md) {
                    return (
                      <SmallAuctionItem
                        mediator={state.force && state.force.mediator}
                        {...this.props}
                        currentUser={state.system.currentUser}
                      />
                    )
                  } else {
                    return (
                      <LargeAuctionItem
                        mediator={state.force && state.force.mediator}
                        {...this.props}
                        currentUser={state.system.currentUser}
                      />
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
        }}
      </Subscribe>
    )
  }
}

const LargeAuctionItem: React.SFC<Props> = (props: Props) => {
  const salePrice = getSalePrice(props.auctionResult.price_realized)
  const truncatedDescription = getDescription(props.auctionResult.description)
  const estimatedPrice = props.auctionResult.estimate.display
  return (
    <Subscribe to={[AuctionResultsStateContainer]}>
      {({ state, showDetailsModal }: AuctionResultsStateContainer) => {
        return (
          <React.Fragment>
            <Col sm={1}>
              <Box height="auto" pr={2}>
                <Image
                  width="70px"
                  src={props.auctionResult.images.thumbnail.url}
                />
              </Box>
            </Col>
            <Col sm={4}>
              <Box pl={1} pr={6}>
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
              <Box pr={2}>
                <Serif size="2">{props.auctionResult.organization}</Serif>
                <Serif size="2" color="black60">
                  {props.auctionResult.sale_date_text}
                </Serif>
                <Serif size="2" color="black60">
                  <FullDescriptionLink onClick={() => showDetailsModal(props)}>
                    Full description
                  </FullDescriptionLink>
                </Serif>
              </Box>
            </Col>
            <Col sm={4}>
              {props.currentUser && salePrice ? (
                <Serif size="2">{`Sale: ${salePrice}`}</Serif>
              ) : (
                <Button
                  onClick={() => {
                    props.mediator &&
                      props.mediator.trigger("open:auth", {
                        mode: "register",
                        copy: "Sign up to see full auction records — for free",
                      })
                  }}
                >
                  Sign up to see price
                </Button>
              )}
              {estimatedPrice && (
                <Serif size="2" color="black60">
                  Est: {estimatedPrice}
                </Serif>
              )}
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
  const estimatedPrice = props.auctionResult.estimate.display

  return (
    <React.Fragment>
      <Col sm={6}>
        <Flex>
          <Box height="auto">
            <Image
              width="70px"
              src={props.auctionResult.images.thumbnail.url}
            />
          </Box>

          <Spacer mr={2} />

          <Box pr={4}>
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
        {props.currentUser && salePrice ? (
          <Serif size="2">{`Sale: ${salePrice}`}</Serif>
        ) : (
          <Button>Sign up to see price</Button>
        )}

        {estimatedPrice && (
          <Serif size="2" color="black60">
            Est: {estimatedPrice}
          </Serif>
        )}
      </Col>
    </React.Fragment>
  )
}

const ExtraSmallAuctionItem: React.SFC<Props> = props => {
  const salePrice = getSalePrice(props.auctionResult.price_realized)
  const estimatedPrice = props.auctionResult.estimate.display
  return (
    <React.Fragment>
      <Col>
        <Flex>
          <Box height="auto">
            <Image
              width="70px"
              src={props.auctionResult.images.thumbnail.url}
            />
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

            {props.currentUser && salePrice ? (
              <Serif size="2">{`Sale: ${salePrice}`}</Serif>
            ) : (
              <Button>Sign up to see price</Button>
            )}

            {estimatedPrice && (
              <Serif size="2" color="black60">
                Est: {estimatedPrice}
              </Serif>
            )}
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
  const truncatedDescription = fullDescription.substr(0, 200)
  return truncatedDescription + "..."
}
