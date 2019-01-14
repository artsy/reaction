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
import { Stepper } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { RespondFragmentContainer as RespondRoute } from "../Respond"

// Need to mock Utils/Events instead of using mockTracking because
// Boot's `dispatch` tracking prop overrides the one injected by
// mockTracking
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("Apps/Order/Utils/trackPageView")

jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("Utils/logger")

const NOW = "2018-12-05T13:47:16.446Z"

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

import { OfferInput } from "Apps/Order/Components/OfferInput"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { ModalButton, ModalDialog } from "Components/Modal/ModalDialog"
import { commitMutation } from "react-relay"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"

const commitMutationMock = commitMutation as jest.Mock<any>

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
  itemsTotalCents: 1000000,
}

let mockPushRoute: jest.Mock<string>

describe("Offer InitialMutation", () => {
  const getWrapper = (extraOrderProps?) => {
    const props = {
      relay: { environment: {} },
      router: { push: mockPushRoute },
      order: {
        ...testOrder,
        ...extraOrderProps,
      },
    }
    return mount(
      <MockBoot>
        <RespondRoute {...props as any} />
        <ConnectedModalDialog />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mockPostEvent.mockReset()
    mockPushRoute = jest.fn()
    commitMutationMock.mockReset()
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
    expect(radios.at(1).text()).toMatch("Send counteroffer")
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
        `/orders/${testOrder.id}/review/accept`
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

    describe("countering the seller's offer", () => {
      it("doesn't work if nothing was typed in", () => {
        const component = getWrapper()

        const counterRadio = component.find(BorderedRadio).at(1)
        counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

        expect(component.find(OfferInput).props().showError).toBe(false)

        component
          .find(Button)
          .last()
          .simulate("click")

        expect(component.find(OfferInput).props().showError).toBe(true)

        expect(commitMutation).not.toHaveBeenCalled()
      })

      it("doesn't let the user continue if the offer value is not positive", () => {
        const component = getWrapper()

        const counterRadio = component.find(BorderedRadio).at(1)
        counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

        component
          .find(OfferInput)
          .props()
          .onChange(0)

        expect(component.find(OfferInput).props().showError).toBe(false)

        component
          .find(Button)
          .last()
          .simulate("click")

        expect(component.find(OfferInput).props().showError).toBe(true)

        expect(commitMutation).not.toHaveBeenCalled()
      })

      it("works when a valid number is inputted", async () => {
        commitMutationMock.mockImplementationOnce((_, { onCompleted }) => {
          onCompleted({
            ecommerceBuyerCounterOffer: { orderOrError: { order: {} } },
          })
        })
        const component = getWrapper()
        const counterRadio = component.find(BorderedRadio).at(1)

        counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

        counterRadio
          .find(OfferInput)
          .props()
          .onChange(9000)

        expect(commitMutationMock).toHaveBeenCalledTimes(0)

        component
          .find(Button)
          .last()
          .props()
          .onClick({})

        expect(commitMutationMock).toHaveBeenCalledTimes(1)

        expect(commitMutationMock.mock.calls[0][1].variables)
          .toMatchInlineSnapshot(`
Object {
  "input": Object {
    "offerId": "myoffer-id",
    "offerPrice": Object {
      "amount": 9000,
      "currencyCode": "USD",
    },
  },
}
`)
        await flushPromiseQueue()

        expect(mockPushRoute).toHaveBeenCalledWith(
          "/orders/2939023/review/counter"
        )
      })
    })
  })

  it("shows the error modal if submitting a counter offer fails at network level", async () => {
    commitMutationMock.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )
    const component = getWrapper()
    const counterRadio = component.find(BorderedRadio).at(1)

    counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

    counterRadio
      .find(Input)
      .props()
      .onChange({ currentTarget: { value: "9000" } } as any)

    expect(commitMutationMock).toHaveBeenCalledTimes(0)

    component
      .find(Button)
      .last()
      .props()
      .onClick({})

    expect(commitMutationMock).toHaveBeenCalledTimes(1)

    await flushPromiseQueue()

    expect(
      component
        .update()
        .find(ModalDialog)
        .props().show
    ).toBe(true)
  })

  it("shows the error modal if submitting a counter offer fails for business reasons", async () => {
    commitMutationMock.mockImplementationOnce((_, { onCompleted }) => {
      onCompleted({
        ecommerceBuyerCounterOffer: { orderOrError: { error: {} } },
      })
    })
    const component = getWrapper()
    const counterRadio = component.find(BorderedRadio).at(1)

    counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

    counterRadio
      .find(Input)
      .props()
      .onChange({ currentTarget: { value: "9000" } } as any)

    expect(commitMutationMock).toHaveBeenCalledTimes(0)

    component
      .find(Button)
      .last()
      .props()
      .onClick({})

    expect(commitMutationMock).toHaveBeenCalledTimes(1)

    await flushPromiseQueue()

    expect(
      component
        .update()
        .find(ModalDialog)
        .props().show
    ).toBe(true)
  })

  describe("The 'amount too small' speed bump", () => {
    it("shows if the offer amount is too small", async () => {
      const component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      component
        .find(OfferInput)
        .props()
        .onChange(1000)

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      await flushPromiseQueue()
      component.update()
      expect(commitMutation).not.toHaveBeenCalled()

      let dialog = component.find(ModalDialog)

      expect(dialog).toHaveLength(1)
      expect(dialog.props().show).toBe(true)

      expect(dialog.text()).toMatchInlineSnapshot(
        `"Offer may be too lowOffers within 25% of the seller's offer are most likely to receive a response.OK"`
      )

      const button = component.find(ModalButton)
      expect(button.length).toBe(1)
      expect(button.text()).toBe("OK")

      // dismiss message
      button.simulate("click")

      await flushPromiseQueue()
      component.update()

      dialog = component.find(ModalDialog)
      expect(dialog.props().show).toBe(false)

      expect(commitMutation).not.toHaveBeenCalled()

      // submit again
      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      expect(commitMutation).toHaveBeenCalledTimes(1)
    })
  })

  describe("The 'amount too high' speed bump", () => {
    it("shows if the offer amount is too high", async () => {
      const component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      component
        .find(OfferInput)
        .props()
        .onChange(17000)

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      await flushPromiseQueue()
      component.update()
      expect(commitMutation).not.toHaveBeenCalled()

      let dialog = component.find(ModalDialog)

      expect(dialog).toHaveLength(1)
      expect(dialog.props().show).toBe(true)

      expect(dialog.text()).toMatchInlineSnapshot(
        `"Offer higher than seller's offerYou’re making an offer higher than the seller's offer.OK"`
      )

      const button = component.find(ModalButton)
      expect(button.length).toBe(1)
      expect(button.text()).toBe("OK")

      // dismiss message
      button.simulate("click")

      await flushPromiseQueue()
      component.update()

      dialog = component.find(ModalDialog)
      expect(dialog.props().show).toBe(false)

      expect(commitMutation).not.toHaveBeenCalled()

      // submit again
      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      expect(commitMutation).toHaveBeenCalledTimes(1)
    })
  })

  describe("Analaytics", () => {
    it("tracks a pageview", () => {
      getWrapper()

      expect(trackPageView).toHaveBeenCalledTimes(1)
    })

    it("tracks the offer input focus", () => {
      const counter = getWrapper()

      const counterRadio = counter.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      expect(mockPostEvent).not.toHaveBeenCalled()

      counter
        .find(OfferInput)
        .find("input")
        .simulate("focus")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Focused on offer input",
        flow: "Make offer",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      const component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      component
        .find(OfferInput)
        .props()
        .onChange(1000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer too low",
        flow: "Make offer",
      })
    })

    it("tracks viwing the high offer speedbump", async () => {
      const component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      component
        .find(OfferInput)
        .props()
        .onChange(20000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer higher than listed price",
        flow: "Make offer",
      })
    })
  })
})
