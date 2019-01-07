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
  Spacer,
} from "@artsy/palette"
import { ArtworkSidebarCommercial_artwork } from "__generated__/ArtworkSidebarCommercial_artwork.graphql"
import { ArtworkSidebarCommercialOfferOrderMutation } from "__generated__/ArtworkSidebarCommercialOfferOrderMutation.graphql"
import { ArtworkSidebarCommercialOrderMutation } from "__generated__/ArtworkSidebarCommercialOrderMutation.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
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
  user: User
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

@track()
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
      <Serif size="5t" weight="semibold">
        {saleMessage}
      </Serif>
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
          <Box py={3}>
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

  @track<ArtworkSidebarCommercialContainerProps>(props => ({
    context_module: Schema.ContextModule.Sidebar,
    type: Schema.Type.Button,
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.ContactGallery,
    artwork_id: props.artwork._id,
  }))
  handleInquiry() {
    get(this.props, props => props.mediator.trigger) &&
      this.props.mediator.trigger("launchInquiryFlow", {
        artworkId: this.props.artwork.id,
      })
  }

  @track((props, state, args) => ({
    action_type: Schema.ActionType.ClickedBuyNow,
    flow: Schema.Flow.BuyNow,
    type: Schema.Type.Button,
  }))
  handleCreateOrder() {
    const { user, mediator } = this.props
    if (user && user.id) {
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
                  artworkId: this.props.artwork._id,
                  editionSetId: get(
                    this.state,
                    state => state.selectedEditionSet.id
                  ),
                },
              },
              onCompleted: data => {
                this.setState(
                  { isCommittingCreateOrderMutation: false },
                  () => {
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
                  }
                )
              },
              onError: this.onMutationError,
            }
          )
        }
      })
    } else {
      mediator.trigger("open:auth", { mode: "login" })
    }
  }

  @track((props, state, args) => ({
    action_type: Schema.ActionType.ClickedMakeOffer,
    flow: Schema.Flow.MakeOffer,
    type: Schema.Type.Button,
  }))
  handleCreateOfferOrder() {
    const { user, mediator } = this.props
    if (user && user.id) {
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
                  artworkId: this.props.artwork._id,
                  editionSetId: get(
                    this.state,
                    state => state.selectedEditionSet.id
                  ),
                },
              },
              onCompleted: data => {
                this.setState(
                  { isCommittingCreateOfferOrderMutation: false },
                  () => {
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
                      window.location.assign(
                        `/orders/${orderOrError.order.id}/offer`
                      )
                    }
                  }
                )
              },
              onError: this.onMutationError,
            }
          )
        }
      })
    } else {
      mediator.trigger("open:auth", { mode: "login" })
    }
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
      return <Separator />
    }
    return (
      <Box textAlign="left">
        {artwork.sale_message && <Separator />}

        {artwork.edition_sets.length < 2 ? (
          artwork.sale_message && (
            <>
              <Spacer mb={3} />
              {this.renderSaleMessage(artwork.sale_message)}
            </>
          )
        ) : (
          <>
            {this.renderEditionSets(artworkEcommerceAvailable)}
            {selectedEditionSet && (
              <>
                <Separator mb={3} />
                {this.renderSaleMessage(selectedEditionSet.sale_message)}
              </>
            )}
          </>
        )}

        {artworkEcommerceAvailable &&
          (artwork.shippingOrigin || artwork.shippingInfo) && <Spacer mt={1} />}
        {artworkEcommerceAvailable &&
          artwork.shippingOrigin && (
            <Sans size="2" color="black60">
              Ships from {artwork.shippingOrigin}
            </Sans>
          )}
        {artworkEcommerceAvailable &&
          artwork.shippingInfo && (
            <Sans size="2" color="black60">
              {artwork.shippingInfo}
            </Sans>
          )}

        {artwork.is_inquireable ||
        artwork.is_acquireable ||
        artwork.is_offerable ? (
          artwork.sale_message && <Spacer mb={3} />
        ) : (
          <Separator mb={3} mt={3} />
        )}
        {artwork.is_inquireable && (
          <Button
            width="100%"
            size="large"
            onClick={this.handleInquiry.bind(this)}
          >
            Contact gallery
          </Button>
        )}
        {artwork.is_acquireable && (
          <Button
            width="100%"
            size="large"
            loading={isCommittingCreateOrderMutation}
            onClick={this.handleCreateOrder.bind(this)}
          >
            Buy now
          </Button>
        )}
        {artwork.is_offerable && (
          <>
            <Spacer mb={2} />
            <Button
              variant={
                artwork.is_acquireable ? "secondaryOutline" : "primaryBlack"
              }
              width="100%"
              size="large"
              loading={isCommittingCreateOfferOrderMutation}
              onClick={this.handleCreateOfferOrder.bind(this)}
            >
              Make offer
            </Button>
          </>
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
      {({ mediator, user }) => (
        <ArtworkSidebarCommercialContainer
          {...props}
          mediator={mediator}
          user={user}
        />
      )}
    </ContextConsumer>
  )
}

export const ArtworkSidebarCommercialFragmentContainer = createFragmentContainer(
  ArtworkSidebarCommercial,
  graphql`
    fragment ArtworkSidebarCommercial_artwork on Artwork {
      id
      _id
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
