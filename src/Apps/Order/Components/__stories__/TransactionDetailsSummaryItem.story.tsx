import { Flex } from "@artsy/palette"
import { TransactionDetailsSummaryItem_order } from "__generated__/TransactionDetailsSummaryItem_order.graphql"
import { mockResolver } from "Apps/__tests__/Fixtures/Order"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ExtractProps } from "Utils/ExtractProps"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "../TransactionDetailsSummaryItem"

const order: TransactionDetailsSummaryItem_order = {
  " $refType": null,
  mode: "BUY",
  itemsTotal: "£3,024.89",
  totalListPrice: "£3,024.89",
  shippingTotal: "£132.32",
  shippingTotalCents: 13232,
  taxTotal: "£232.23",
  taxTotalCents: 23223,
  buyerTotal: "£1,200,823.33",
  lastOffer: null,
}

const orderQuery = graphql`
  query TransactionDetailsSummaryItemStoryQuery {
    order: ecommerceOrder(id: "foo") {
      ...TransactionDetailsSummaryItem_order
    }
  }
`

const render = (
  extraOrderProps?: Partial<TransactionDetailsSummaryItem_order>,
  extraComponentProps?: Partial<
    ExtractProps<typeof TransactionDetailsSummaryItem>
  >
) => (
  <MockRelayRenderer
    Component={(props: any) => (
      <TransactionDetailsSummaryItem {...extraComponentProps} {...props} />
    )}
    mockResolvers={mockResolver({
      ...order,
      ...extraOrderProps,
    })}
    query={orderQuery}
  />
)

storiesOf("Apps/Order Page/Components", module)
  .add("TransactionDetailsSummary", () => {
    return (
      <Section title="Transaction Summary">
        <Flex width={280} flexDirection="column">
          {render()}
        </Flex>
      </Section>
    )
  })

  .add("TransactionDetailsSummary (Offer)", () => (
    <Section title="Offer Transaction Summary">
      <Flex width={280} flexDirection="column">
        {render({
          mode: "OFFER",
          lastOffer: {
            id: "2345",
            amountCents: 102489,
          },
        })}
      </Flex>
    </Section>
  ))

  .add("TransactionDetailsSummary (Offer override)", () => (
    <Section title="Transaction Summary (offer should be 123)">
      <Flex width={280} flexDirection="column">
        {render(
          {
            mode: "OFFER",
            lastOffer: {
              id: "2345",
              amountCents: 102489,
            },
          },
          {
            offerOverride: "£123.00",
          }
        )}
      </Flex>
    </Section>
  ))
