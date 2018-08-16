import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const mock = {
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
  Order: (_, { id, ...others }) => {
    return {
      id,
      code: "abcdefg",
      itemsTotal: "$12,000",
      shippingTotal: null,
      taxTotal: null,
      buyerTotal: "$12,000",
      lineItems: {
        edges: [
          {
            node: {
              artwork: {
                artist_names: "Lisa Breslow",
                title: "Gramercy Park South",
                date: "2016",
                medium: "Oil and pencil on panel",
                dimensions: {
                  in: "36 × 36 in",
                  cm: "91.4 × 91.4 cm",
                },
                attribution_class: null,
                image: {
                  resized: {
                    url:
                      "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=185&height=184&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FtOfWds4sIX_9WpRf3RqaQQ%2Flarge.jpg",
                  },
                },
              },
            },
          },
        ],
      },
      partner: {
        name: "Kathryn Markel Fine Arts",
        locations: [
          {
            city: "New York",
            state: "NY",
            country: "US",
          },
        ],
      },
    }
  },
}

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/shipping"
      mockResolvers={mock}
    />
  ))
  .add("Payment", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/payment"
      mockResolvers={mock}
    />
  ))
  .add("Review", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/review"
      mockResolvers={mock}
    />
  ))
  .add("Submission", () => (
    <StorybooksRouter
      routes={orderRoutes}
      initialRoute="/order2/123/submission"
      mockResolvers={mock}
    />
  ))
