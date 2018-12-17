import {
  Box,
  Button,
  Flex,
  FlexProps,
  Radio,
  RadioGroup,
  Sans,
  Separator,
  Serif,
} from "@artsy/palette"
import { ArtworkSidebarCommercial_artwork } from "__generated__/ArtworkSidebarCommercial_artwork.graphql"
import { ArtworkSidebarCommercialOfferOrderMutation } from "__generated__/ArtworkSidebarCommercialOfferOrderMutation.graphql"
import { ArtworkSidebarCommercialOrderMutation } from "__generated__/ArtworkSidebarCommercialOrderMutation.graphql"
import { ContextConsumer } from "Artsy/Router"
import { Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { SFC } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"

type EditionSet = ArtworkSidebarCommercial_artwork["edition_sets"][0]

export interface ArtworkSidebarCommercialContainerProps
  extends ArtworkSidebarCommercialProps {
  mediator: Mediator
}

export interface ArtworkSidebarCommercialContainerState {
  isCommittingCreateOrderMutation: boolean
  isCommittingCreateOfferOrderMutation: boolean
  isErrorModalOpen: boolean
  selectedEditionSet: EditionSet
}

const Row: React.SFC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="left" alignItems="top" {...others}>
    {children}
  </Flex>
)

const logger = createLogger(
  "Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial.tsx"
)

export class ArtworkSidebarCommercialContainer extends React.Component<
  ArtworkSidebarCommercialContainerProps,
  ArtworkSidebarCommercialContainerState
> {
  state: ArtworkSidebarCommercialContainerState = {
    isCommittingCreateOrderMutation: false,
    isCommittingCreateOfferOrderMutation: false,
    isErrorModalOpen: false,
    selectedEditionSet: this.firstAvailableEcommerceEditionSet(),
  }

  firstAvailableEcommerceEditionSet(): EditionSet {
    const editionSets = this.props.artwork.edition_sets

    return editionSets.find(editionSet => {
      return editionSet.is_acquireable || editionSet.is_offerable
    })
  }

  renderSaleMessage(saleMessage: string) {
    return (
      <Box mb={1} mt={1}>
        <Serif size="5t" weight="semibold">
          {saleMessage}
        </Serif>
      </Box>
    )
  }

  renderEditionSet(editionSet: EditionSet, includeSelectOption: boolean) {
    const editionEcommerceAvailable =
      editionSet.is_acquireable || editionSet.is_offerable

    const editionFragment = (
      <>
        <SizeInfo piece={editionSet} />
        <Serif ml="auto" size="2">
          {editionSet.sale_message}
        </Serif>
      </>
    )
    if (includeSelectOption) {
      return (
        <Row>
          <Radio
            mr="1"
            onSelect={e => {
              this.setState({ selectedEditionSet: editionSet })
            }}
            selected={this.state.selectedEditionSet === editionSet}
            disabled={!editionEcommerceAvailable}
          />
          {editionFragment}
        </Row>
      )
    } else {
      return <Row>{editionFragment}</Row>
    }
  }

  renderEditionSets(includeSelectOption: boolean) {
    const editionSets = this.props.artwork.edition_sets

    const editionSetsFragment = editionSets.map((editionSet, index) => {
      return (
        <React.Fragment key={editionSet.__id}>
          <Box py={2}>
            {this.renderEditionSet(editionSet, includeSelectOption)}
          </Box>
          {index !== editionSets.length - 1 && <Separator />}
        </React.Fragment>
      )
    })

    return <RadioGroup>{editionSetsFragment}</RadioGroup>
  }

  onMutationError = (error: ErrorWithMetadata) => {
    logger.error(error)
    this.setState({
      isCommittingCreateOrderMutation: false,
      isErrorModalOpen: true,
    })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  handleInquiry = () => {
    get(this.props, props => props.mediator.trigger) &&
      this.props.mediator.trigger("launchInquiryFlow", {
        artworkId: this.props.artwork.id,
      })
  }

  handleCreateOrder = () => {
    this.setState({ isCommittingCreateOrderMutation: true }, () => {
      if (get(this.props, props => props.relay.environment)) {
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
                editionSetId: get(
                  this.state,
                  state => state.selectedEditionSet.id
                ),
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
            onError: this.onMutationError,
          }
        )
      }
    })
  }

  handleCreateOfferOrder = () => {
    this.setState({ isCommittingCreateOfferOrderMutation: true }, () => {
      if (get(this.props, props => props.relay.environment)) {
        commitMutation<ArtworkSidebarCommercialOfferOrderMutation>(
          this.props.relay.environment,
          {
            mutation: graphql`
              mutation ArtworkSidebarCommercialOfferOrderMutation(
                $input: CreateOfferOrderWithArtworkInput!
              ) {
                ecommerceCreateOfferOrderWithArtwork(input: $input) {
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
                editionSetId: get(
                  this.state,
                  state => state.selectedEditionSet.id
                ),
              },
            },
            onCompleted: data => {
              this.setState({ isCommittingCreateOrderMutation: false })
              const {
                ecommerceCreateOfferOrderWithArtwork: { orderOrError },
              } = data
              if (orderOrError.error) {
                this.onMutationError(
                  new ErrorWithMetadata(
                    orderOrError.error.code,
                    orderOrError.error
                  )
                )
              } else {
                window.location.assign(`/orders/${orderOrError.order.id}/offer`)
              }
            },
            onError: this.onMutationError,
          }
        )
      }
    })
  }

  render() {
    const { artwork } = this.props
    const {
      isCommittingCreateOrderMutation,
      isCommittingCreateOfferOrderMutation,
      selectedEditionSet,
    } = this.state
    const artworkEcommerceAvailable =
      artwork.is_acquireable || artwork.is_offerable

    if (!artwork.sale_message && !artwork.is_inquireable) {
      return null
    }
    return (
      <Box pb={3} textAlign="left">
        {artwork.edition_sets.length < 2 && artwork.sale_message ? (
          this.renderSaleMessage(artwork.sale_message)
        ) : (
          <>
            {this.renderEditionSets(artworkEcommerceAvailable)}
            {selectedEditionSet &&
              this.renderSaleMessage(selectedEditionSet.sale_message)}
          </>
        )}
        {artworkEcommerceAvailable &&
          artwork.shippingOrigin && (
            <Sans size="2" color="black60">
              Ships from {artwork.shippingOrigin}
            </Sans>
          )}
        {artworkEcommerceAvailable &&
          artwork.shippingInfo && (
            <Sans mb={2} size="2" color="black60">
              {artwork.shippingInfo}
            </Sans>
          )}
        {artwork.is_inquireable && (
          <Button
            width="100%"
            size="medium"
            mt={1}
            onClick={this.handleInquiry}
          >
            Contact gallery
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
            Buy now
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
            loading={isCommittingCreateOfferOrderMutation}
            onClick={this.handleCreateOfferOrder}
          >
            Make offer
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
        id
        __id
        is_acquireable
        is_offerable
        sale_message
        ...ArtworkSidebarSizeInfo_piece
      }
    }
  `
)
