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
import { mount, ReactWrapper } from "enzyme"
import moment from "moment"
import React from "react"
import { Stepper } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { RespondFragmentContainer as RespondRoute } from "../Respond"

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
        <ConnectedModalDialog />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mockPushRoute = jest.fn()
    mockMediatorTrigger = jest.fn()
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
    let component: ReactWrapper
    beforeEach(async () => {
      component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      component
        .find(OfferInput)
        .props()
        .onChange(2499)

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      await flushPromiseQueue()
      component.update()
    })

    it("shows if the offer amount is too small", async () => {
      expect(commitMutation).not.toHaveBeenCalled()

      const dialog = component.find(ModalDialog)

      expect(dialog).toHaveLength(1)
      expect(dialog.props().show).toBe(true)

      expect(dialog.text()).toMatchInlineSnapshot(
        `"Offer may be too lowOffers within 25% of the counteroffer are most likely to receive a response.CancelContinue"`
      )

      const buttons = component.find(ModalButton)
      expect(buttons.length).toBe(2)
      expect(buttons.first().text()).toBe("Cancel")
      expect(buttons.last().text()).toBe("Continue")
    })

    it("goes away without mutations when clicking Cancel", async () => {
      component
        .find(ModalButton)
        .first()
        .simulate("click")

      await flushPromiseQueue()
      component.update()

      const dialog = component.find(ModalDialog)
      expect(dialog.props().show).toBe(false)
      expect(commitMutation).not.toHaveBeenCalled()
    })

    it("goes away with mutations when clicking Continue", async () => {
      component
        .find(ModalButton)
        .last()
        .simulate("click")

      await flushPromiseQueue()
      component.update()

      const dialog = component.find(ModalDialog)
      expect(dialog.props().show).toBe(false)
      expect(commitMutation).toHaveBeenCalled()
    })
  })

  describe("The 'amount too high' speed bump", () => {
    let component: ReactWrapper
    beforeEach(async () => {
      component = getWrapper()
      const counterRadio = component.find(BorderedRadio).at(1)
      counterRadio.props().onSelect({ selected: true, value: "COUNTER" })

      component
        .find(OfferInput)
        .props()
        .onChange(11000)

      component
        .find(Button)
        .last()
        .props()
        .onClick({})

      await flushPromiseQueue()
      component.update()
    })

    it("shows if the offer amount is too high", async () => {
      expect(commitMutation).not.toHaveBeenCalled()

      const dialog = component.find(ModalDialog)

      expect(dialog).toHaveLength(1)
      expect(dialog.props().show).toBe(true)

      expect(dialog.text()).toMatchInlineSnapshot(
        `"Offer higher than list priceYou’re making an offer higher than the counteroffer.CancelContinue"`
      )

      const buttons = component.find(ModalButton)
      expect(buttons.length).toBe(2)
      expect(buttons.first().text()).toBe("Cancel")
      expect(buttons.last().text()).toBe("Continue")
    })

    it("goes away without mutations when clicking Cancel", async () => {
      component
        .find(ModalButton)
        .first()
        .simulate("click")

      await flushPromiseQueue()
      component.update()

      const dialog = component.find(ModalDialog)
      expect(dialog.props().show).toBe(false)
      expect(commitMutation).not.toHaveBeenCalled()
    })

    it("goes away with mutations when clicking Continue", async () => {
      component
        .find(ModalButton)
        .last()
        .simulate("click")

      await flushPromiseQueue()
      component.update()

      const dialog = component.find(ModalDialog)
      expect(dialog.props().show).toBe(false)
      expect(commitMutation).toHaveBeenCalled()
    })
  })
})
