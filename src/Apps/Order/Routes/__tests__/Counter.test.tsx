import { Button } from "@artsy/palette"
import {
  Buyer,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { ArtworkSummaryItemFragmentContainer } from "Apps/Order/Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer } from "Apps/Order/Components/CreditCardSummaryItem"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { Stepper } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { CounterFragmentContainer as CounterRoute } from "../Counter"

jest.mock("Utils/getCurrentTimeAsIsoString")

const NOW = "2018-12-05T13:47:16.446Z"

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("react-relay")

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: moment(NOW)
    .add(1, "day")
    .toISOString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
    amount: "$sellers.offer",
  },
  myLastOffer: {
    ...OfferWithTotals,
    createdAt: moment(NOW)
      .subtract(1, "seconds")
      .toISOString(),
    amount: "$your.offer",
    fromParticipant: "BUYER",
  },
  offers: { edges: Offers },
  buyer: Buyer,
}

let mockPushRoute: jest.Mock<string>
let mockMediatorTrigger: jest.Mock<string>

describe("Offer InitialMutation", () => {
  const getWrapper = (extraOrderProps?) => {
    return mount(
      <MockBoot>
        <CounterRoute
          relay={{ environment: {} }}
          router={{ push: mockPushRoute }}
          mediator={{ trigger: mockMediatorTrigger }}
          order={{
            ...testOrder,
            ...extraOrderProps,
          }}
        />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mockPushRoute = jest.fn()
    mockMediatorTrigger = jest.fn()
  })

  it("Shows the stepper", () => {
    const component = getWrapper()
    const stepper = component.find(OrderStepper)
    expect(stepper.text()).toMatchInlineSnapshot(`"Respond Review"`)

    const index = component.find(Stepper).props().currentStepIndex
    expect(index).toBe(1)
  })

  it("shows the countdown timer", () => {
    const component = getWrapper({
      stateExpiresAt: moment(NOW)
        .add(1, "day")
        .add(4, "hours")
        .add(22, "minutes")
        .add(59, "seconds"),
    })
    const timer = component.find(CountdownTimer)
    expect(timer.text()).toContain("01d 04h 22m 59s left")
  })

  it("shows the transaction summary", () => {
    const component = getWrapper()
    const transactionSummary = component.find(
      TransactionDetailsSummaryItemFragmentContainer
    )
    expect(transactionSummary).toHaveLength(1)

    expect(transactionSummary.text()).toMatch("Your counterofferChange")
    expect(transactionSummary.text()).toMatch("Your offer$your.offer")
    expect(transactionSummary.text()).toMatch("Seller's offer$sellers.offer")
  })

  it("shows the artwork summary", () => {
    const component = getWrapper()
    const artworkSummary = component.find(ArtworkSummaryItemFragmentContainer)
    expect(artworkSummary).toHaveLength(1)

    expect(artworkSummary.text()).toMatch("Lisa BreslowGramercy Park South")
  })

  it("shows the shipping details", () => {
    const component = getWrapper()
    const shippingSummary = component.find(ShippingSummaryItemFragmentContainer)
    expect(shippingSummary).toHaveLength(1)

    expect(shippingSummary.text()).toMatch("Ship toJoelle Van Dyne401 Broadway")
  })

  it("shows the payment details", () => {
    const component = getWrapper()
    const paymentSummary = component.find(
      CreditCardSummaryItemFragmentContainer
    )
    expect(paymentSummary).toHaveLength(1)

    expect(paymentSummary.text()).toMatchInlineSnapshot(`"•••• 4444  Exp 3/21"`)
  })

  it("shows the submit button", () => {
    const component = getWrapper()
    const continueButton = component.find(Button).last()
    expect(continueButton.text()).toBe("Submit")
  })

  it("Shows the conditions of sale disclaimer.", () => {
    const component = getWrapper()
    expect(component.text()).toMatch(
      "By clicking Submit, I agree to Artsy’s Conditions of Sale."
    )
  })
})
