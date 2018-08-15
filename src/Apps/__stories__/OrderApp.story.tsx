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
    }
  },
}

const Router = props => (
  <StorybooksRouter
    routes={orderRoutes}
    mockResolvers={mock}
    historyOptions={{ useBeforeUnload: true }}
    {...props}
  />
)

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => <Router initialRoute="/order2/123/shipping" />)
  .add("Payment", () => <Router initialRoute="/order2/123/payment" />)
  .add("Review", () => <Router initialRoute="/order2/123/review" />)
  .add("Submission", () => <Router initialRoute="/order2/123/submission" />)
