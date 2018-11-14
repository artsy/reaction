/* eslint-disable promise/always-return */
import gql from "lib/gql"
import { mockxchange } from "test/fixtures/exchange/mockxchange"
import exchangeOrderJSON from "test/fixtures/exchange/order.json"
import { sampleOrder } from "test/fixtures/results/sample_order"
import { runQuery } from "test/utils"
import { OrderBuyerFields } from "./order_fields"

let rootValue

describe("Create Buy Order Mutation", () => {
  beforeEach(() => {
    const resolvers = {
      Mutation: {
        createOrderWithArtwork: () => ({
          orderOrError: { order: exchangeOrderJSON },
        }),
      },
    }

    rootValue = mockxchange(resolvers)
  })

  it("creates order and returns it", () => {
    const mutation = gql`
      mutation {
        ecommerceCreateOrderWithArtwork(
          input: { artworkId: "111", editionSetId: "232", quantity: 1 }
        ) {
          orderOrError {
            ... on OrderWithMutationSuccess {
              order {
                ${OrderBuyerFields}
              }
            }
            ... on OrderWithMutationFailure {
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

    return runQuery(mutation, rootValue).then(data => {
      expect(data!.ecommerceCreateOrderWithArtwork.orderOrError.order).toEqual(
        sampleOrder()
      )
    })
  })
})
