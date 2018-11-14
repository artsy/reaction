/* eslint-disable promise/always-return */
import gql from "lib/gql"
import { mockxchange } from "test/fixtures/exchange/mockxchange"
import exchangeOrderJSON from "test/fixtures/exchange/order.json"
import { sampleOrder } from "test/fixtures/results/sample_order"
import { runQuery } from "test/utils"
import { OrderBuyerFields } from "./order_fields"

let rootValue

describe("Approve Order Mutation", () => {
  beforeEach(() => {
    const resolvers = {
      Mutation: {
        setPayment: () => ({
          orderOrError: { order: exchangeOrderJSON },
        }),
      },
    }

    rootValue = mockxchange(resolvers)
  })
  it("sets order's payment information", () => {
    const mutation = gql`
      mutation {
        setOrderPayment(input: {
            orderId: "111",
            creditCardId: "1231-1232-4343-4343"
          }) {
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
      expect(data!.setOrderPayment.orderOrError.order).toEqual(
        sampleOrder({ includeCreditCard: true })
      )
    })
  })
})
