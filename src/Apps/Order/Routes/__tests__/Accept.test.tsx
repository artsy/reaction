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
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { ModalButton } from "Components/Modal/ModalDialog"
import { Stepper } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import {
  acceptOfferFailed,
  AcceptOfferPaymentFailed,
  acceptOfferSuccess,
} from "../__fixtures__/MutationResults"
import { AcceptFragmentContainer as AcceptRoute } from "../Accept"

const commitMutation = _commitMutation as jest.Mock<any>

jest.mock("Apps/Order/Utils/trackPageView")

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
    fromParticipant: "SELLER",
  },
  offers: { edges: Offers },
  buyer: Buyer,
}
let mockPushRoute: jest.Mock<string>

describe("Accept seller offer", () => {
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
        <AcceptRoute {...props as any} />
      </MockBoot>
    )
  }
  beforeEach(() => {
    mockPushRoute = jest.fn()
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

    expect(transactionSummary.text()).toMatch("Accept seller's offerChange")
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

  describe("mutation", () => {
    const errorLogger = console.error

    beforeEach(() => {
      console.error = jest.fn() // Silences component logging.
      commitMutation.mockReset()
    })

    afterEach(() => {
      console.error = errorLogger
    })

    it("routes to status page after mutation completes", () => {
      const component = getWrapper()
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(acceptOfferSuccess)
        }
      )
      const submitButton = component.find(Button).last()
      submitButton.simulate("click")

      expect(mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/status`
      )
    })

    it("shows the button spinner while loading the mutation", () => {
      const component = getWrapper()
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(() => {
        const buttonProps = component
          .update() // We need to wait for the component to re-render
          .find("Button")
          .props() as any
        expect(buttonProps.loading).toBeTruthy()
      })

      const submitButton = component.find(Button).last()
      submitButton.simulate("click")
    })

    it("hides the button spinner when the mutation completes", () => {
      const component = getWrapper()
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(acceptOfferSuccess)
        }
      )
      const submitButton = component.find(Button).last()
      submitButton.simulate("click")

      const buttonProps = component
        .update() // We need to wait for the component to re-render
        .find("Button")
        .props() as any
      expect(buttonProps.loading).toBeFalsy()
    })

    it("shows an error modal when there is an error from the server", () => {
      const component = getWrapper()
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(acceptOfferFailed)
        }
      )

      const submitButton = component.find(Button).last()
      submitButton.simulate("click")

      const errorComponent = component.find(ErrorModal)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain("An error occurred")
      expect(errorComponent.text()).toContain(
        "Something went wrong. Please try again or contact orders@artsy.net."
      )

      component.find(ModalButton).simulate("click")
      expect(component.find(ErrorModal).props().show).toBe(false)
    })

    it("shows an error modal if there is a capture_failed error", () => {
      const component = getWrapper()
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(AcceptOfferPaymentFailed)
        }
      )

      const submitButton = component.find(Button).last()
      submitButton.simulate("click")

      const errorComponent = component.find(ErrorModal)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain("An error occurred")
      expect(errorComponent.text()).toContain(
        "There was an error processing your payment. Please try again or contact orders@artsy.net."
      )

      component.find(ModalButton).simulate("click")
      expect(component.find(ErrorModal).props().show).toBe(false)
    })
  })

  it("tracks a pageview", () => {
    getWrapper()

    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
