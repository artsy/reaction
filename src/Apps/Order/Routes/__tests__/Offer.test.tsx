import { Button } from "@artsy/palette"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { Input } from "Components/Input"
import { ModalButton, ModalDialog } from "Components/Modal/ModalDialog"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { RelayProp } from "react-relay"
import { commitMutation as _commitMutation } from "react-relay"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { UntouchedOfferOrder } from "../../../__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItem } from "../../Components/TransactionDetailsSummaryItem"
import {
  initialOfferFailedAmountIsInvalid,
  initialOfferFailedCannotOffer,
  initialOfferSuccess,
} from "../__fixtures__/MutationResults"
import { OfferFragmentContainer as OfferRoute } from "../Offer"

// Need to mock Utils/Events instead of using mockTracking because
// Boot's `dispatch` tracking prop overrides the one injected by
// mockTracking
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("Apps/Order/Utils/trackPageView")

const commitMutation = _commitMutation as any

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("Offer InitialMutation", () => {
  const getWrapper = someProps => {
    return mount(
      <MockBoot>
        <OfferRoute {...someProps} />
        <ConnectedModalDialog />
      </MockBoot>
    )
  }

  let testProps: any
  beforeEach(() => {
    mockPostEvent.mockReset()
    testProps = {
      order: { ...UntouchedOfferOrder, id: "1234" },
      relay: { environment: {} } as RelayProp,
      router: { push: jest.fn() },
      mediator: { trigger: jest.fn() },
    } as any
  })

  it("renders", () => {
    const component = getWrapper(testProps)
    const input = component.find(Input)
    expect(input.text()).toContain("Your offer")
  })

  it("shows the list price just below the input", () => {
    const component = getWrapper(testProps)
    const container = component.find("div#offer-page-left-column")
    expect(container.text()).toContain("List price: $16,000")
  })

  it("can receive input, which updates the transaction summary", () => {
    const component = getWrapper(testProps)
    const input = component.find(OfferInput)
    const transactionSummary = component.find(TransactionDetailsSummaryItem)

    expect(transactionSummary.text()).toContain("Your offer")

    input.props().onChange(1)
    expect(transactionSummary.text()).toContain("Your offer$1.00")

    input.props().onChange(1023)
    expect(transactionSummary.text()).toContain("Your offer$1,023.00")
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

    it("doesn't let the user continue if they haven't typed anything in", () => {
      const component = getWrapper(testProps)

      expect(component.find(OfferInput).text()).not.toMatch(
        "Offer amount missing or invalid."
      )
      expect(component.find(OfferInput).props().showError).toBe(false)

      component.find(Button).simulate("click")

      expect(component.find(OfferInput).props().showError).toBe(true)
      expect(component.find(OfferInput).text()).toMatch(
        "Offer amount missing or invalid."
      )

      expect(commitMutation).not.toHaveBeenCalled()
    })

    it("doesn't let the user continue if the offer value is not positive", () => {
      const component = getWrapper(testProps)

      component
        .find(OfferInput)
        .props()
        .onChange(0)

      expect(component.find(OfferInput).text()).not.toMatch(
        "Offer amount missing or invalid."
      )
      expect(component.find(OfferInput).props().showError).toBe(false)

      component.find(Button).simulate("click")

      expect(component.find(OfferInput).props().showError).toBe(true)
      expect(component.find(OfferInput).text()).toMatch(
        "Offer amount missing or invalid."
      )

      expect(commitMutation).not.toHaveBeenCalled()
    })

    it("routes to shipping screen after mutation completes", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(initialOfferSuccess)
        }
      )

      component
        .find(OfferInput)
        .props()
        .onChange(16000)
      component.find(Button).simulate("click")

      expect(testProps.router.push).toHaveBeenCalledWith(
        "/orders/1234/shipping"
      )
    })

    it("shows the button spinner while committing the mutation", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(() => {
        const buttonProps = component
          .update() // We need to wait for the component to re-render
          .find("Button")
          .props() as any
        expect(buttonProps.loading).toBeTruthy()
      })

      component
        .find(OfferInput)
        .props()
        .onChange(16000)

      component.find(Button).simulate("click")
    })

    it("shows an error modal when there is an error from the server", async () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(initialOfferFailedCannotOffer)
        }
      )

      component
        .find(OfferInput)
        .props()
        .onChange(16000)

      component.find(Button).simulate("click")

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

    it("shows a helpful error message in a modal when there is an error from the server because the amount is invalid", async () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(initialOfferFailedAmountIsInvalid)
        }
      )

      component
        .find(OfferInput)
        .props()
        .onChange(16000)

      component.find(Button).simulate("click")

      await flushPromiseQueue()
      component.update()

      const errorComponent = component.find(ModalDialog)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain("Invalid offer")
      expect(errorComponent.text()).toContain(
        "The offer amount is either missing or invalid. Please try again."
      )
    })

    describe("The 'amount too small' speed bump", () => {
      it("shows if the offer amount is too small", async () => {
        const component = getWrapper(testProps)

        component
          .find(OfferInput)
          .props()
          .onChange(1000)

        component.find(Button).simulate("click")

        await flushPromiseQueue()
        component.update()
        expect(commitMutation).not.toHaveBeenCalled()

        let dialog = component.find(ModalDialog)

        expect(dialog).toHaveLength(1)
        expect(dialog.props().show).toBe(true)

        expect(dialog.text()).toMatchInlineSnapshot(
          `"Offer may be too lowOffers within 25% of the list price are most likely to receive a response.OK"`
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
        component.find(Button).simulate("click")

        expect(commitMutation).toHaveBeenCalledTimes(1)
      })
    })

    describe("The 'amount too high' speed bump", () => {
      it("shows if the offer amount is too high", async () => {
        const component = getWrapper(testProps)

        component
          .find(OfferInput)
          .props()
          .onChange(17000)

        component.find(Button).simulate("click")

        await flushPromiseQueue()
        component.update()
        expect(commitMutation).not.toHaveBeenCalled()

        let dialog = component.find(ModalDialog)

        expect(dialog).toHaveLength(1)
        expect(dialog.props().show).toBe(true)

        expect(dialog.text()).toMatchInlineSnapshot(
          `"Offer higher than list priceYou’re making an offer higher than the list price.OK"`
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
        component.find(Button).simulate("click")

        expect(commitMutation).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("Analaytics", () => {
    it("tracks a pageview", () => {
      getWrapper(testProps)

      expect(trackPageView).toHaveBeenCalledTimes(1)
    })

    it("tracks the offer input focus", () => {
      const page = getWrapper(testProps)

      expect(mockPostEvent).not.toHaveBeenCalled()

      page.find("input").simulate("focus")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "1234",
        action_type: "Focused on offer input",
        flow: "Make offer",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      const component = getWrapper(testProps)

      component
        .find(OfferInput)
        .props()
        .onChange(1000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "1234",
        action_type: "Viewed offer too low",
        flow: "Make offer",
      })
    })

    it("tracks viwing the high offer speedbump", async () => {
      const component = getWrapper(testProps)

      component
        .find(OfferInput)
        .props()
        .onChange(20000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "1234",
        action_type: "Viewed offer higher than listed price",
        flow: "Make offer",
      })
    })
  })
})
