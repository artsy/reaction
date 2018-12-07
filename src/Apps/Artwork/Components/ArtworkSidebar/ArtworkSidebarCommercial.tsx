import {
  Box,
  Button,
  Flex,
  FlexProps,
  Radio,
  RadioGroup,
  Separator,
  Serif,
} from "@artsy/palette"
import React, { SFC } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

import { ArtworkSidebarCommercial_artwork } from "__generated__/ArtworkSidebarCommercial_artwork.graphql"
import { ArtworkSidebarCommercialOrderMutation } from "__generated__/ArtworkSidebarCommercialOrderMutation.graphql"
import { ContextConsumer } from "Artsy/Router"
import { Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { ErrorWithMetadata } from "Utils/errors"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"

export interface ArtworkSidebarCommercialContainerProps
  extends ArtworkSidebarCommercialProps {
  mediator: Mediator
}

export interface ArtworkSidebarCommercialContainerState {
  isCommittingCreateOrderMutation: boolean
  isErrorModalOpen: boolean
  selectedEditionId: string
}
const Row: React.SFC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="left" alignItems="top" {...others}>
    {children}
  </Flex>
)

export class ArtworkSidebarCommercialContainer extends React.Component<
  ArtworkSidebarCommercialContainerProps,
  ArtworkSidebarCommercialContainerState
> {
  state = {
    isCommittingCreateOrderMutation: false,
    isErrorModalOpen: false,
    selectedEditionId:
      this.props.artwork.edition_sets[0] &&
      this.props.artwork.edition_sets[0].__id,
  }

  renderEdition(edition) {
    const isEcommerceEnrolled = edition.is_acquireable || edition.is_inquireable
    const editionFragment = (
      <>
        <SizeInfo piece={edition} />
        <Serif ml="auto" size="2">
          {edition.sale_message}
        </Serif>
      </>
    )

    return (
      <Row>
        <Radio
          mr="1"
          onSelect={e => {
            this.setState({ selectedEditionId: edition.__id } as any)
          }}
          selected={this.state.selectedEditionId === edition.__id}
          disabled={!isEcommerceEnrolled}
        />
        {editionFragment}
      </Row>
    )
  }
  renderEditions() {
    const editions = this.props.artwork.edition_sets
    const editionsFragment = editions.map((edition, index) => {
      return (
        <React.Fragment key={edition.__id}>
          <Box p={2}>{this.renderEdition(edition)}</Box>
          {index !== editions.length - 1 && <Separator />}
        </React.Fragment>
      )
    })

    return <RadioGroup>{editionsFragment}</RadioGroup>
  }

  onMutationError(error) {
    this.setState({
      isCommittingCreateOrderMutation: false,
      isErrorModalOpen: true,
    })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  handleInquiry = () => {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("launchInquiryFlow", {
        artworkId: this.props.artwork.id,
      })
  }

  handleCreateOrder = e => {
    console.log("Creating order")

    this.setState({ isCommittingCreateOrderMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        commitMutation<ArtworkSidebarCommercialOrderMutation>(
          this.props.relay.environment,
          {
            mutation: graphql`
              mutation ArtworkSidebarCommercialOrderMutation(
                $input: CreateOrderWithArtworkInput!
              ) {
                ecommerceCreateOrderWithArtwork(input: $input) {
                  orderOrError {
                    ... on OrderWithMutationSuccess {
                      __typename
                      order {
                        id
                        mode
                      }
                    }
                    ... on OrderWithMutationFailure {
                      error {
                        type
                        code
                        data
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              input: {
                artworkId: this.props.artwork.id,
              },
            },
            onCompleted: data => {
              this.setState({ isCommittingCreateOrderMutation: false })
              const {
                ecommerceCreateOrderWithArtwork: { orderOrError },
              } = data
              if (orderOrError.error) {
                this.onMutationError(
                  new ErrorWithMetadata(
                    orderOrError.error.code,
                    orderOrError.error
                  )
                )
              } else {
                window.location.assign(`/orders/${orderOrError.order.id}`)
              }
            },
            onError: this.onMutationError.bind(this),
          }
        )
      }
    })
  }

  render() {
    const { artwork } = this.props
    const { isCommittingCreateOrderMutation } = this.state
    const isEcommerceEnrolled = artwork.is_acquireable || artwork.is_offerable

    if (!artwork.sale_message && !artwork.is_inquireable) {
      return null
    }
    return (
      <Box pb={3} textAlign="left">
        {artwork.edition_sets.length < 2 && artwork.sale_message ? (
          <Box pb={2} pt={1}>
            <Serif size="5t" weight="semibold">
              {artwork.sale_message}
            </Serif>
          </Box>
        ) : (
          this.renderEditions()
        )}
        {isEcommerceEnrolled &&
          artwork.shippingInfo && (
            <Serif size="2" color="black60">
              {artwork.shippingInfo}
            </Serif>
          )}
        {isEcommerceEnrolled &&
          artwork.shippingOrigin && (
            <Serif size="2" color="black60">
              Ships from {artwork.shippingOrigin}
            </Serif>
          )}
        {artwork.is_inquireable && (
          <Button
            width="100%"
            size="medium"
            mt={1}
            onClick={this.handleInquiry}
          >
            Contact Gallery
          </Button>
        )}
        {artwork.is_acquireable && (
          <Button
            width="100%"
            size="medium"
            mt={1}
            loading={isCommittingCreateOrderMutation}
            onClick={this.handleCreateOrder}
          >
            Buy Now
          </Button>
        )}
        {artwork.is_offerable && (
          <Button
            variant={
              artwork.is_acquireable ? "secondaryOutline" : "primaryBlack"
            }
            width="100%"
            size="medium"
            mt={1}
          >
            Make Offer
          </Button>
        )}

        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="orders@artsy.net"
        />
      </Box>
    )
  }
}

interface ArtworkSidebarCommercialProps {
  artwork: ArtworkSidebarCommercial_artwork
  relay?: RelayProp
}

export const ArtworkSidebarCommercial: SFC<
  ArtworkSidebarCommercialProps
> = props => {
  return (
    <ContextConsumer>
      {({ mediator }) => (
        <ArtworkSidebarCommercialContainer {...props} mediator={mediator} />
      )}
    </ContextConsumer>
  )
}

export const ArtworkSidebarCommercialFragmentContainer = createFragmentContainer(
  ArtworkSidebarCommercial,
  graphql`
    fragment ArtworkSidebarCommercial_artwork on Artwork {
      id
      is_acquireable
      is_inquireable
      is_offerable
      sale_message
      shippingInfo
      shippingOrigin
      edition_sets {
        __id
        ...ArtworkSidebarSizeInfo_piece
      }
    }
  `
)
