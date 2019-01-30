import { Button, Stepper } from "@artsy/palette"
import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { ModalButton, ModalDialog } from "Components/Modal/ModalDialog"
import { StepSummaryItem } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import {
  rejectOfferFailed,
  rejectOfferSuccess,
} from "../__fixtures__/MutationResults/rejectOffer"
import { RejectFragmentContainer as RejectRoute } from "../Reject"

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
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
  },
}

let mockPushRoute: jest.Mock<string>

describe("Buyer rejects seller offer", () => {
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
        <RejectRoute {...props as any} />
        <ConnectedModalDialog />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mockPushRoute = jest.fn()
  })

  it("shows the stepper", () => {
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

  it("shows a message explaining the consequences of a rejection", () => {
    const component = getWrapper()
    const summary = component.find(StepSummaryItem)
    expect(summary.text()).toContain(
      "Declining an offer permanently ends the negotiation process."
    )
  })

  it("shows a change link that takes the user back to the respond page", () => {
    const component = getWrapper()
    component.find("StepSummaryItem a").simulate("click")
    expect(mockPushRoute).toHaveBeenCalledWith(
      `/orders/${testOrder.id}/respond`
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
          onCompleted(rejectOfferSuccess)
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
          onCompleted(rejectOfferSuccess)
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

  it("shows an error modal when there is an error from the server", async () => {
    const component = getWrapper()
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce(
      (_environment, { onCompleted }) => {
        onCompleted(rejectOfferFailed)
      }
    )

    const submitButton = component.find(Button).last()
    submitButton.simulate("click")

    await flushPromiseQueue()
    component.update()

    const errorComponent = component.find(ModalDialog)
    expect(errorComponent.props().show).toBe(true)
    expect(errorComponent.text()).toContain("An error occurred")
    expect(errorComponent.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )

    component.find(ModalButton).simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.find(ModalDialog).props().show).toBe(false)
  })

  it("shows an error modal when there is a network error", async () => {
    const component = getWrapper()
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    component.find(Button).simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.find(ModalDialog).props().show).toBe(true)
  })

  it("tracks a pageview", () => {
    getWrapper()

    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
