import { BorderedRadio, Button } from "@artsy/palette"
import {
  Buyer,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { ArtworkSummaryItemFragmentContainer } from "Apps/Order/Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer } from "Apps/Order/Components/CreditCardSummaryItem"
import { OfferHistoryItemFragmentContainer } from "Apps/Order/Components/OfferHistoryItem"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Input } from "Components/Input"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { Stepper } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { RespondFragmentContainer as RespondRoute } from "../Respond"

jest.mock("Utils/getCurrentTimeAsIsoString")

const NOW = "2018-12-05T13:47:16.446Z"

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

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
        <RespondRoute
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

  it("renders", () => {
    const component = getWrapper()
    const input = component.find(Input)
    expect(input.text()).toContain("Your offer")
  })

  it("Shows the stepper", () => {
    const component = getWrapper()
    const stepper = component.find(OrderStepper)
    expect(stepper.text()).toMatch("RespondReview")

    const index = component.find(Stepper).props().currentStepIndex
    expect(index).toBe(0)
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

  it("shows the offer history item", () => {
    const component = getWrapper()
    const offerHistory = component.find(OfferHistoryItemFragmentContainer)
    expect(offerHistory).toHaveLength(1)

    const button = offerHistory.find(Button)
    expect(button.text()).toMatch("Show offer history")

    button.props().onClick({})

    expect(offerHistory.text()).toMatch(
      "You (May 21)$1,200.00Seller (Apr 30)$1,500.00You (Apr 5)$1,100.00"
    )
  })

  it("shows the transaction summary", () => {
    const component = getWrapper()
    const transactionSummary = component.find(
      TransactionDetailsSummaryItemFragmentContainer
    )
    expect(transactionSummary).toHaveLength(1)

    expect(transactionSummary.text()).toMatch("Seller's offer$14,000")
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

  it("shows the continue button", () => {
    const component = getWrapper()
    const continueButton = component.find(Button).last()
    expect(continueButton.text()).toBe("Continue")
  })

  it("shows three radio buttons with response choices", () => {
    const component = getWrapper()
    const radios = component.find(BorderedRadio)
    expect(radios).toHaveLength(3)

    expect(radios.first().text()).toMatch("Accept seller's offer")
    expect(radios.at(1).text()).toMatch("Send a counteroffer")
    expect(radios.at(2).text()).toMatch("Decline seller's offer")
  })

  describe("taking action", () => {
    // TODO: get rid of window.alert
    const _alert = window.alert
    beforeEach(() => {
      window.alert = jest.fn()
    })
    afterEach(() => {
      window.alert = _alert
    })

    it("Accepting the seller's offer works", () => {
      const component = getWrapper()
      const acceptRadio = component.find(BorderedRadio).first()

      acceptRadio.props().onSelect({ selected: true, value: "ACCEPT" })

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      expect(mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/accept`
      )
    })

    it("Declining the seller's offer works", () => {
      const component = getWrapper()
      const declineRadio = component.find(BorderedRadio).last()

      declineRadio.props().onSelect({ selected: true, value: "DECLINE" })

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      expect(mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/review/decline`
      )
    })

    it("Countering the seller's offer works", () => {
      const component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)

      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      counterRadio
        .find(Input)
        .props()
        .onChange({ currentTarget: { value: "84838" } } as any)

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      // TODO: get rid of window.alert
      expect(window.alert).toHaveBeenCalledWith(
        `You decided to COUNTER with 84838.`
      )
    })
  })
})
