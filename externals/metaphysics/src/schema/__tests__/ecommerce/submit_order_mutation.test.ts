/* eslint-disable promise/always-return */
import gql from "lib/gql"
import { mockxchange } from "test/fixtures/exchange/mockxchange"
import exchangeOrderJSON from "test/fixtures/exchange/order.json"
import { sampleOrder } from "test/fixtures/results/sample_order"
import { runQuery } from "test/utils"
import { OrderBuyerFields } from "./order_fields"

let rootValue

describe("Submit Order Mutation", () => {
  beforeEach(() => {
    const resolvers = {
      Mutation: {
        submitOrder: () => ({
          orderOrError: {
            order: exchangeOrderJSON,
          },
        }),
      },
    }

    rootValue = mockxchange(resolvers)
  })
  it("submits order and returns it", () => {
    const mutation = gql`
      mutation {
        submitOrder(input: { orderId: "111" }) {
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
      expect(data!.submitOrder.orderOrError.order).toEqual(sampleOrder())
    })
  })
})
