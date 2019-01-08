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
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { Stepper } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import {
  insufficientInventoryResponse,
  submitPendingOfferFailed,
  submitPendingOfferSuccess,
} from "../__fixtures__/MutationResults/submitPendingOffer"
import { CounterFragmentContainer as CounterRoute } from "../Counter"

jest.mock("Apps/Order/Utils/trackPageView")

jest.mock("Utils/getCurrentTimeAsIsoString")

const NOW = "2018-12-05T13:47:16.446Z"

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("react-relay")
const commitMutation = _commitMutation as jest.Mock<any>

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

describe("Submit Pending Counter Offer", () => {
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
        <CounterRoute {...props as any} />
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

  describe("mutation", () => {
    beforeEach(() => {
      commitMutation.mockReset()
    })

    it("routes to status page after mutation completes", () => {
      const component = getWrapper()
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(submitPendingOfferSuccess)
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
          .update()
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
          onCompleted(submitPendingOfferSuccess)
        }
      )
      const submitButton = component.find(Button).last()
      submitButton.simulate("click")

      const buttonProps = component
        .update()
        .find("Button")
        .props() as any
      expect(buttonProps.loading).toBeFalsy()
    })
  })

  it("shows an error modal with proper error when there is insufficient inventory", () => {
    const component = getWrapper()
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce(
      (_environment, { onCompleted }) => {
        onCompleted(insufficientInventoryResponse)
      }
    )

    const submitButton = component.find(Button).last()
    submitButton.simulate("click")

    const errorComponent = component.find(ErrorModal)
    expect(errorComponent.props().show).toBe(true)
    expect(errorComponent.text()).toContain("This work has already been sold.")
    expect(errorComponent.text()).toContain(
      "Please contact orders@artsy.net with any questions."
    )
  })

  it("shows generic error modal when there is an error from the server", () => {
    const component = getWrapper()
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce(
      (_environment, { onCompleted }) => {
        onCompleted(submitPendingOfferFailed)
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

  it("shows an error modal when there is a network error", () => {
    const component = getWrapper()
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    component.find(Button).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(true)
  })

  it("tracks a pageview", () => {
    getWrapper()

    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
