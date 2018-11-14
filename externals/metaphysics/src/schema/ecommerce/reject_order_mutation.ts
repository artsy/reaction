import { graphql } from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"
import gql from "lib/gql"
import { OrderMutationInputType } from "schema/ecommerce/types/order_mutation_input"
import { extractEcommerceResponse } from "./extractEcommerceResponse"
import { SellerOrderFields } from "./query_helpers"
import { OrderOrFailureUnionType } from "./types/order_or_error_union"

export const RejectOrderMutation = mutationWithClientMutationId({
  name: "RejectOrder",
  description: "Rejects an order",
  inputFields: OrderMutationInputType.getFields(),
  outputFields: {
    orderOrError: {
      type: OrderOrFailureUnionType,
    },
  },
  mutateAndGetPayload: (
    { orderId, creditCardId },
    context,
    { rootValue: { accessToken, exchangeSchema } }
  ) => {
    if (!accessToken) {
      return new Error("You need to be signed in to perform this action")
    }

    const mutation = gql`
      mutation rejectOrder($orderId: ID!) {
        ecommerceRejectOrder(input: {
          id: $orderId,
        }) {
          orderOrError {
            __typename
            ... on EcommerceOrderWithMutationSuccess {
              order {
                ${SellerOrderFields}
                lineItems{
                  edges{
                    node{
                      id
                      priceCents
                      artworkId
                      editionSetId
                      quantity
                    }
                  }
                }
              }
            }
            ... on EcommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `
    return graphql(exchangeSchema, mutation, null, context, {
      orderId,
      creditCardId,
    }).then(extractEcommerceResponse("ecommerceRejectOrder"))
  },
})
