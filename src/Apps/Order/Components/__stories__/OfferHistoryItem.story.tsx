import { Flex } from "@artsy/palette"
import { OfferHistoryItem_order } from "__generated__/OfferHistoryItem_order.graphql"
import {
  Buyer,
  mockResolver,
  Offers,
  OfferWithTotals,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ExtractProps } from "Utils/ExtractProps"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "../OfferHistoryItem"
const orderQuery = graphql`
  query OfferHistoryItemStoryQuery {
    order: ecommerceOrder(id: "foo") {
      ...OfferHistoryItem_order
    }
  }
`

const render = (
  extraOrderProps?: Partial<OfferHistoryItem_order>,
  extraComponentProps?: Partial<ExtractProps<typeof OfferHistoryItem>>
) => (
  <MockRelayRenderer
    Component={(props: any) => (
      <OfferHistoryItem {...extraComponentProps} {...props} />
    )}
    mockResolvers={mockResolver({
      ...UntouchedOfferOrder,
      buyer: Buyer,
      lastOffer: OfferWithTotals,
      ...extraOrderProps,
    })}
    query={orderQuery}
  />
)

storiesOf("Apps/Order Page/Components", module).add("OfferHistoryItem", () => {
  return (
    <>
      <Section title="With only one offer">
        <Flex
          style={{ maxWidth: "540px", width: "100%" }}
          flexDirection="column"
        >
          {render()}
        </Flex>
      </Section>
      <Section title="With many offers">
        <Flex
          style={{ maxWidth: "540px", width: "100%" }}
          flexDirection="column"
        >
          {render({
            offers: { edges: Offers },
          })}
        </Flex>
      </Section>
    </>
  )
})
