import { TransactionDetailsSummaryItem_order } from "__generated__/TransactionDetailsSummaryItem_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Flex, Sans, Serif, Spacer } from "@artsy/palette"
import { StepSummaryItem, StepSummaryItemProps } from "Styleguide/Components"

export interface TransactionDetailsSummaryItemProps
  extends StepSummaryItemProps {
  order: TransactionDetailsSummaryItem_order
  offerOverride?: string | null
  useLastSubmittedOffer?: boolean
  offerContextPrice?: "LIST_PRICE" | "LAST_OFFER"
}

export class TransactionDetailsSummaryItem extends React.Component<
  TransactionDetailsSummaryItemProps
> {
  static defaultProps: Partial<TransactionDetailsSummaryItemProps> = {
    offerContextPrice: "LIST_PRICE",
  }
  render() {
    const { offerOverride, order, ...others } = this.props
    return (
      <StepSummaryItem {...others}>
        {this.renderPriceEntry()}
        <Spacer mb={2} />
        <Entry label="Shipping" value={this.shippingDisplayAmount()} />

        <Entry label="Tax" value={this.taxDisplayAmount()} />
        <Spacer mb={2} />
        <Entry label="Total" value={this.buyerTotalDisplayAmount()} final />
      </StepSummaryItem>
    )
  }

  getOffer(): TransactionDetailsSummaryItem_order["lastOffer"] | null {
    return this.props.useLastSubmittedOffer
      ? this.props.order.lastOffer
      : this.props.order.myLastOffer
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
        const offer = this.getOffer()
        return offer
          ? this.formattedAmount(
              offer.shippingTotal,
              offer.shippingTotalCents
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
        const offer = this.getOffer()
        return offer
          ? this.formattedAmount(offer.taxTotal, offer.taxTotalCents) || "—"
          : "—"
    }
  }

  buyerTotalDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return order.buyerTotal
      case "OFFER":
        const offer = this.getOffer()
        return offer && offer.buyerTotal
    }
  }

  renderPriceEntry = () => {
    const { order, offerOverride, offerContextPrice } = this.props
    if (order.mode === "BUY") {
      return <Entry label="Price" value={order.itemsTotal} />
    }
    const offer = this.getOffer()
    const isBuyerOffer =
      offerOverride != null || !offer || offer.fromParticipant === "BUYER"

    return (
      <>
        <Entry
          label={isBuyerOffer ? "Your offer" : "Seller's offer"}
          value={offerOverride || (offer && offer.amount) || "—"}
        />
        {offerContextPrice === "LIST_PRICE" ? (
          <SecondaryEntry label="List price" value={order.totalListPrice} />
        ) : (
          // show last offer
          <SecondaryEntry
            label={
              order.lastOffer.fromParticipant === "SELLER"
                ? "Seller's offer"
                : "Your offer"
            }
            value={order.lastOffer.amount}
          />
        )}
      </>
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

graphql`
  fragment TransactionDetailsSummaryItemOfferProperties on Offer {
    id
    amount(precision: 2)
    amountCents
    shippingTotal(precision: 2)
    shippingTotalCents
    taxTotal(precision: 2)
    taxTotalCents
    buyerTotal(precision: 2)
    buyerTotalCents
    fromParticipant
  }
`

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
          ...TransactionDetailsSummaryItemOfferProperties @relay(mask: false)
        }
        myLastOffer {
          ...TransactionDetailsSummaryItemOfferProperties @relay(mask: false)
        }
      }
    }
  `
)
