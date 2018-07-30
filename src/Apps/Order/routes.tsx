import React from "react"
import { graphql } from "react-relay"
import { OrderApp } from "./OrderApp"

// @ts-ignore
import { PaymentFragmentContainer as PaymentRoute } from "Apps/Order/Routes/Payment"
// @ts-ignore
import { ReviewFragmentContainer as ReviewRoute } from "Apps/Order/Routes/Review"
// @ts-ignore
import { ShippingFragmentContainer as ShippingRoute } from "Apps/Order/Routes/Shipping"
// @ts-ignore
import { SubmissionFragmentContainer as SubmissionRoute } from "Apps/Order/Routes/Submission"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// @ts-ignore
import { PaymentProps } from "./Routes/Payment"
// @ts-ignore
import { ReviewProps } from "./Routes/Review"
// @ts-ignore
import { ShippingProps } from "./Routes/Shipping"
// @ts-ignore
import { SubmissionProps } from "./Routes/Submission"

const renderCurrentStep = step => ({ props, Component }) => (
  <Component currentStepIndex={step} {...props} />
)

export const routes = [
  {
    path: "/order2/:orderID",
    Component: OrderApp,
    query: graphql`
      query routes_OrderQuery {
        me {
          name
        }
      }
    `,
    children: [
      {
        path: "shipping",
        Component: ShippingRoute,
        render: renderCurrentStep(0),
        query: graphql`
          query routes_ShippingQuery($orderID: String!) {
            order(id: $orderID) {
              ...Shipping_order
            }
          }
        `,
      },
      {
        path: "payment",
        Component: PaymentRoute,
        render: renderCurrentStep(1),
        query: graphql`
          query routes_PaymentQuery($orderID: String!) {
            order(id: $orderID) {
              ...Payment_order
            }
          }
        `,
      },
      {
        path: "review",
        Component: ReviewRoute,
        render: renderCurrentStep(2),
        query: graphql`
          query routes_ReviewQuery($orderID: String!) {
            order(id: $orderID) {
              ...Review_order
            }
          }
        `,
      },
      {
        path: "submission",
        Component: SubmissionRoute,
        query: graphql`
          query routes_SubmissionQuery($orderID: String!) {
            order(id: $orderID) {
              ...Submission_order
            }
          }
        `,
      },
    ],
  },
]
