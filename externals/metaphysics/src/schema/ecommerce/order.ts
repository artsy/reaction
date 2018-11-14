import { graphql, GraphQLNonNull, GraphQLString } from "graphql"
import gql from "lib/gql"
import { OrderType } from "schema/ecommerce/types/order"
import { extractEcommerceResponse } from "./extractEcommerceResponse"
import { AllOrderFields } from "./query_helpers"

export const Order = {
  name: "Order",
  type: OrderType,
  description: "Returns a single Order",
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: (_parent, { id }, context, { rootValue: { exchangeSchema } }) => {
    const query = gql`
      query EcommerceOrder($id: ID, $code: String) {
        ecommerceOrder(id: $id, code: $code) {
          ${AllOrderFields}
          lineItems{
            edges{
              node{
                id
                priceCents
                artworkId
                editionSetId
                quantity
                fulfillments{
                  edges{
                    node{
                      id
                      courier
                      trackingId
                      estimatedDelivery
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    return graphql(exchangeSchema, query, null, context, {
      id,
    }).then(extractEcommerceResponse("ecommerceOrder"))
  },
}
