import { Flex } from "@artsy/palette"
import { ArtworkSummaryItem_order } from "__generated__/ArtworkSummaryItem_order.graphql"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtworkSummaryItemFragmentContainer } from "../ArtworkSummaryItem"

const makeLineItems = ({ artistName, artworkTitle }) => ({
  edges: [
    {
      node: {
        artwork: {
          artist_names: artistName,
          title: artworkTitle,
          date: "2018",
          shippingOrigin: "New York, NY",
          image: {
            resized: {
              url:
                "https://d32dm0rphc51dk.cloudfront.net/SCShf97jlpFZpDBJUBqntg/small.jpg",
            },
          },
        },
      },
    },
  ],
})

const order: ArtworkSummaryItem_order = {
  " $refType": null,
  lineItems: makeLineItems({
    artistName: "Francesca DiMattio",
    artworkTitle: "The Fox",
  }) as any,
  seller: {
    name: "Salon 94",
  },
}

const orderQuery = graphql`
  query ArtworkSummaryItemStoryQuery {
    order: ecommerceOrder(id: "foo") {
      ...ArtworkSummaryItem_order
    }
  }
`

const render = (extraOrderProps?: Partial<ArtworkSummaryItem_order>) => {
  return (
    <MockRelayRenderer
      Component={ArtworkSummaryItemFragmentContainer}
      mockResolvers={{
        Order: () => ({
          ...order,
          ...extraOrderProps,
          seller: undefined,
        }),
        OrderParty: () => ({
          ...order.seller,
          __typename: "User",
        }),
      }}
      query={orderQuery}
    />
  )
}
storiesOf("Apps/Order Page/Components", module)
  .add("ArtworkSummaryItem", () => {
    return (
      <Section title="Artwork Summary">
        <Flex width={280} flexDirection="column">
          {render()}
        </Flex>
      </Section>
    )
  })
  .add("ArtworkSummaryItem (with long titles)", () => (
    <Section title="Artwork Summary">
      <Flex width={280} flexDirection="column">
        {render({
          lineItems: makeLineItems({
            artistName: "Francesca DiMattio and Orta Theroxicus",
            artworkTitle: "Some quite long title you know how artists can be",
          }) as any,
          seller: {
            name: "Salon Nineteen Eighty Four and Three Quarters",
          },
        })}
      </Flex>
    </Section>
  ))
