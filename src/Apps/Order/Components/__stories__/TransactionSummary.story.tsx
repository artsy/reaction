import { Flex } from "@artsy/palette"
import { TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

const makeLineItem = ({ artistName, artworkTitle }) => ({
  edges: [
    {
      node: {
        artwork: {
          artist_names: artistName,
          title: artworkTitle,
          date: "2018",
          shippingOrigin: "New York, NY",
          image: {
            resized_transactionSummary: {
              url:
                "https://d32dm0rphc51dk.cloudfront.net/SCShf97jlpFZpDBJUBqntg/small.jpg",
            },
          },
        },
      },
    },
  ],
})

storiesOf("Apps/Order Page/Components", module)
  .add("TransactionSummary", () => {
    return (
      <Section title="Transaction Summary">
        <Flex width={280} flexDirection="column">
          <TransactionSummary
            order={{
              " $refType": null,
              mode: "BUY",
              itemsTotal: "£3,024.89",
              offerTotal: null,
              shippingTotal: "£132.32",
              shippingTotalCents: 13232,
              taxTotal: "£232.23",
              taxTotalCents: 23223,
              buyerTotal: "£1,200,823.33",
              lineItems: makeLineItem({
                artistName: "Francesca DiMattio",
                artworkTitle: "The Fox",
              }) as any,
              seller: {
                name: "Salon 94",
              },
              lastOffer: null,
            }}
          />
        </Flex>
      </Section>
    )
  })
  .add("TransactionSummary (with long titles)", () => (
    <Section title="Transaction Summary">
      <Flex width={280} flexDirection="column">
        <TransactionSummary
          order={{
            " $refType": null,
            mode: "BUY",
            itemsTotal: "£3,024.89",
            offerTotal: null,
            shippingTotal: "£132.32",
            shippingTotalCents: 13232,
            taxTotal: "£232.23",
            taxTotalCents: 23223,
            buyerTotal: "£1,200,823.33",
            lineItems: makeLineItem({
              artistName: "Francesca DiMattio and Orta Theroxicus",
              artworkTitle: "Some quite long title you know how artists can be",
            }) as any,
            seller: {
              name: "Salon Nineteen Eighty Four and Three Quarters",
            },
            lastOffer: null,
          }}
        />
      </Flex>
    </Section>
  ))
  .add("TransactionSummary (Offer)", () => (
    <Section title="Transaction Summary">
      <Flex width={280} flexDirection="column">
        <TransactionSummary
          order={{
            " $refType": null,
            mode: "OFFER",
            itemsTotal: "£3,024.89",
            offerTotal: "£1,024.89",
            shippingTotal: "£132.32",
            shippingTotalCents: 13232,
            taxTotal: "£232.23",
            taxTotalCents: 23223,
            buyerTotal: "£1,200,823.33",
            lineItems: makeLineItem({
              artistName: "Francesca DiMattio",
              artworkTitle: "The Fox",
            }) as any,
            seller: {
              name: "Salon Nineteen Eighty Four and Three Quarters",
            },
            lastOffer: {
              id: "2345",
              amountCents: 1024.89,
            },
          }}
        />
      </Flex>
    </Section>
  ))
