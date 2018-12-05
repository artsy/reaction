import { TransactionDetailsSummaryItem_order } from "__generated__/TransactionDetailsSummaryItem_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import {
  Flex,
  FlexProps,
  Sans,
  Serif,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"

export interface TransactionDetailsSummaryItemProps extends FlexProps {
  order: TransactionDetailsSummaryItem_order
  offerOverride?: string | null
  renderHeaderEntry?(): any
}

export class TransactionDetailsSummaryItem extends React.Component<
  TransactionDetailsSummaryItemProps
> {
  render() {
    const { offerOverride, order, ...others } = this.props
    return (
      <StackableBorderBox flexDirection="column" {...others}>
        {this.props.renderHeaderEntry ? this.props.renderHeaderEntry() : null}
        {/* TODO: Seller's offer / Your offer (/ Buyer's offer? Will sellers see this component?) */}
        {this.renderPriceEntry()}
        <Spacer mb={2} />
        <Entry label="Shipping" value={this.shippingDisplayAmount()} />

        <Entry label="Tax" value={this.taxDisplayAmount()} />
        <Spacer mb={2} />
        <Entry label="Total" value={this.buyerTotalDisplayAmount()} final />
      </StackableBorderBox>
    )
  }

  shippingDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return (
          this.formattedAmount(order.shippingTotal, order.shippingTotalCents) ||
          "—"
        )
      case "OFFER":
        return order.myLastOffer
          ? this.formattedAmount(
              order.myLastOffer.shippingTotal,
              order.myLastOffer.shippingTotalCents
            ) || "—"
          : "—"
    }
  }

  taxDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return this.formattedAmount(order.taxTotal, order.taxTotalCents) || "—"
      case "OFFER":
        return order.myLastOffer
          ? this.formattedAmount(
              order.myLastOffer.taxTotal,
              order.myLastOffer.taxTotalCents
            ) || "—"
          : "—"
    }
  }

  buyerTotalDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return order.buyerTotal
      case "OFFER":
        return order.myLastOffer && order.myLastOffer.buyerTotal
    }
  }

  renderPriceEntry = () => {
    const { order, offerOverride } = this.props
    const offerPriceEntry = () => {
      const labelText =
        order.lastOffer.fromParticipant === "SELLER"
          ? "Seller's offer"
          : "Your offer"
      return (
        <>
          <Entry
            label={labelText}
            value={
              offerOverride ||
              (order.myLastOffer && order.myLastOffer.amount) ||
              "—"
            }
          />
          <SecondaryEntry label="List price" value={order.totalListPrice} />
        </>
      )
    }

    return order.mode === "BUY" ? (
      <Entry label="Price" value={order.itemsTotal} />
    ) : (
      offerPriceEntry()
    )
  }

  formattedAmount = (amount, amountCents) => {
    // FIXME: Use actual currency code
    if (amount) {
      return amount
    } else {
      return amountCents === 0 ? "$0.00" : null
    }
  }
}

interface SecondaryEntryProps {
  label: React.ReactNode
  value: React.ReactNode
}

interface EntryProps extends SecondaryEntryProps {
  final?: boolean
}

const Entry: React.SFC<EntryProps> = ({ label, value, final }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Serif size={["2", "3"]} color="black60">
        {label}
      </Serif>
    </div>
    <div>
      <Serif
        size={["2", "3"]}
        color={final ? "black100" : "black60"}
        weight={final ? "semibold" : "regular"}
      >
        {value}
      </Serif>
    </div>
  </Flex>
)

const SecondaryEntry: React.SFC<SecondaryEntryProps> = ({ label, value }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Sans size="2" color="black60">
        {label}
      </Sans>
    </div>
    <div>
      <Sans size="2" color="black60">
        {value}
      </Sans>
    </div>
  </Flex>
)

export const TransactionDetailsSummaryItemFragmentContainer = createFragmentContainer(
  TransactionDetailsSummaryItem,
  graphql`
    fragment TransactionDetailsSummaryItem_order on Order {
      __typename
      mode
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      itemsTotal(precision: 2)
      totalListPrice(precision: 2)
      buyerTotal(precision: 2)
      ... on OfferOrder {
        lastOffer {
          id
          fromParticipant
        }
        myLastOffer {
          id
          amount(precision: 2)
          amountCents
          shippingTotal(precision: 2)
          shippingTotalCents
          taxTotal(precision: 2)
          taxTotalCents
          buyerTotal(precision: 2)
          buyerTotalCents
        }
      }
    }
  `
)
