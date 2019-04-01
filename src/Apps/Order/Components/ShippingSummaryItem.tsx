import { Serif } from "@artsy/palette"
import { media } from "@artsy/palette"
import { ShippingSummaryItem_order } from "__generated__/ShippingSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/v2/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ShippingAddressFragmentContainer as ShippingAddress } from "./ShippingAddress"

/**
 * When the order is completed or canceled state we _don't_ want to tell
 * the user that they'll be assigned an artsy specialist as it doesn't make
 * sense in that context
 */
const showPickupCopy = state => state !== "FULFILLED" && state !== "CANCELED"

const ShippingSummaryItem = ({
  order: { state, requestedFulfillment, lineItems },
  ...others
}: {
  order: ShippingSummaryItem_order
} & StepSummaryItemProps) => {
  return requestedFulfillment.__typename === "Ship" ? (
    <StyledStepSummaryItem title="Ship to" {...others}>
      <ShippingAddress ship={requestedFulfillment} />
    </StyledStepSummaryItem>
  ) : (
    <StyledStepSummaryItem
      title={<>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>}
      /* Fixes spacing issues with title when no pickup description copy is present */
      mb={showPickupCopy(state) ? undefined : -1}
      {...others}
    >
      {showPickupCopy(state) && (
        <Serif size="3t">
          After your order is confirmed, a specialist will contact you within 2
          business days to coordinate pickup.
        </Serif>
      )}
    </StyledStepSummaryItem>
  )
}

const StyledStepSummaryItem = styled(StepSummaryItem)`
  ${media.xs`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `};
`

export const ShippingSummaryItemFragmentContainer = createFragmentContainer(
  ShippingSummaryItem,
  graphql`
    fragment ShippingSummaryItem_order on Order {
      state
      requestedFulfillment {
        __typename
        ...ShippingAddress_ship
      }
      lineItems {
        edges {
          node {
            artwork {
              shippingOrigin
            }
          }
        }
      }
    }
  `
)
