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
        setShipping: () => ({
          orderOrError: { order: exchangeOrderJSON },
        }),
      },
    }

    rootValue = mockxchange(resolvers)
  })
  it("sets order's shipping information", () => {
    const mutation = gql`
      mutation {
        setOrderShipping(
          input: {
            orderId: "111"
            fulfillmentType: SHIP
            shipping: {
              name: "Dr Collector"
              addressLine1: "Vanak"
              addressLine2: "P 80"
              city: "Tehran"
              region: "TH"
              country: "Iran"
              postalCode: "09821"
              phoneNumber: "090302821"
            }
          }
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
      expect(data!.setOrderShipping.orderOrError.order).toEqual(sampleOrder())
    })
  })
})
