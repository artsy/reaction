/* eslint-disable promise/always-return */
import gql from "lib/gql"
import { mockxchange } from "test/fixtures/exchange/mockxchange"
import exchangeOrderJSON from "test/fixtures/exchange/order.json"
import { sampleOrder } from "test/fixtures/results/sample_order"
import { runQuery } from "test/utils"
import { OrderSellerFields } from "./order_fields"

let rootValue

describe("Reject Order Mutation", () => {
  beforeEach(() => {
    const resolvers = {
      Mutation: {
        rejectOrder: () => ({
          orderOrError: { order: exchangeOrderJSON },
        }),
      },
    }
    rootValue = mockxchange(resolvers)
  })
  it("rejects order and return it", () => {
    const mutation = gql`
      mutation {
        rejectOrder(input: { orderId: "111" }) {
          orderOrError {
            ... on OrderWithMutationSuccess {
              order {
                ${OrderSellerFields}
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
      expect(data!.rejectOrder.orderOrError.order).toEqual(sampleOrder())
    })
  })
})
