import { TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Apps/Order Page/Components", module).add(
  "TransactionSummary",
  () => {
    return (
      <Section title="Transaction Summary">
        <Flex width={280} flexDirection="column">
          <TransactionSummary
            order={{
              " $refType": null,
              itemsTotal: "£3,024.89",
              shippingTotal: "£132.32",
              taxTotal: "£232.23",
              buyerTotal: "£1,200,823.33",
              lineItems: {
                edges: [
                  {
                    node: {
                      artwork: {
                        artist_names: "Francesca DiMattio",
                        title: "The Fox and the Hound",
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
              },
              partner: {
                name: "Salon 94",
              },
            }}
          />
        </Flex>
      </Section>
    )
  }
)
