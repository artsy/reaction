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
}

export class TransactionDetailsSummaryItem extends React.Component<
  TransactionDetailsSummaryItemProps
> {
  render() {
    const { offerOverride, order, ...others } = this.props
    return (
      <StackableBorderBox flexDirection="column" {...others}>
        {/* TODO: Seller's offer / Your offer (/ Buyer's offer? Will sellers see this component?) */}
        {this.priceDisplayComponent(order, offerOverride)}
        <Spacer mb={2} />
        <Entry label="Shipping" value={this.shippingDisplayAmount(order)} />

        <Entry label="Tax" value={this.taxDisplayAmount(order)} />
        <Spacer mb={2} />
        <Entry label="Total" value={order.buyerTotal} final />
      </StackableBorderBox>
    )
  }

  private shippingDisplayAmount = order => {
    return order.mode === "BUY"
      ? this.formattedAmount(order.shippingTotal, order.shippingTotalCents) ||
          "—"
      : this.formattedAmount(
          order.myLastOffer.shippingTotal,
          order.myLastOffer.shippingTotalCents
        ) || "—"
  }
  private taxDisplayAmount = order => {
    return order.mode === "BUY"
      ? this.formattedAmount(order.taxTotal, order.taxTotalCents) || "—"
      : this.formattedAmount(
          order.myLastOffer.taxTotal,
          order.myLastOffer.taxTotalCents
        ) || "—"
  }

  private priceDisplayComponent = (order, offerOverride) => {
    return order.mode === "BUY" ? (
      <Entry label="Price" value={order.itemsTotal} />
    ) : (
      <>
        <Entry
          label="Your offer"
          value={offerOverride || order.myLastOffer.amount}
        />
        <SecondaryEntry label="List price" value={order.totalListPrice} />
      </>
    )
  }

  private formattedAmount = (amount, amountCents) => {
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
      mode
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      itemsTotal(precision: 2)
      totalListPrice(precision: 2)
      buyerTotal(precision: 2)
      lastOffer {
        id
        amountCents
      }
      ... on OfferOrder {
        myLastOffer {
          id
          amount(precision: 2)
          amountCents
          shippingTotal(precision: 2)
          shippingTotalCents
          taxTotal(precision: 2)
          taxTotalCents
        }
      }
    }
  `
)
