import { BorderedRadio, Checkbox } from "@artsy/palette"

import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { BankTransferExperiment } from "Apps/Order/Components/BankTransferExperiment"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import { graphql } from "react-relay"
import * as paymentPickerMock from "../../Components/__mocks__/PaymentPicker"
import { AddressForm } from "../../Components/AddressForm"
import {
  settingOrderPaymentFailed,
  settingOrderPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { PaymentFragmentContainer } from "../Payment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("Apps/Order/Utils/trackPageView")
jest.mock(
  "Apps/Order/Components/PaymentPicker",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return require("../../Components/__mocks__/PaymentPicker")
  }
)

const testOrder = { ...BuyOrderWithShippingDetails, id: "1234" }

describe("Payment", () => {
  const { buildPage, mutations, routes } = createTestEnv({
    Component: PaymentFragmentContainer,
    defaultData: {
      order: testOrder,
      me: { creditCards: { edges: [] } },
    },
    defaultMutationResults: {
      ...settingOrderPaymentSuccess,
    },
    query: graphql`
      query PaymentTestQuery {
        me {
          ...Payment_me
        }
        order: commerceOrder(id: "unused") {
          ...Payment_order
        }
      }
    `,
    TestPage: class PaymentTestPage extends OrderAppTestPage {
      get nameInput() {
        return this.find("input[placeholder='Add full name']")
      }

      get sameAddressCheckbox() {
        return this.find(Checkbox)
      }

      get addressForm() {
        return this.find(AddressForm)
      }

      async toggleSameAddressCheckbox() {
        this.sameAddressCheckbox.simulate("click")
        await this.update()
      }

      setName(name: string) {
        ;(this.nameInput.instance() as any).value = name
        this.nameInput.simulate("change")
      }
    },
  })

  it("shows the button spinner while loading the mutation", async () => {
    const page = await buildPage()
    await page.expectButtonSpinnerWhenSubmitting()
  })

  it("shows the default error modal when the payment picker throws an error", async () => {
    paymentPickerMock.useThrownError()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    paymentPickerMock.useErrorResult()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "This is the description of an error.",
      "Please enter another payment method or contact your bank for more information."
    )
  })

  it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
    paymentPickerMock.useInternalErrorResult()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "An internal error occurred",
      "Please try again or contact orders@artsy.net."
    )
  })

  it("commits setOrderPayment mutation with the credit card id", async () => {
    const page = await buildPage()
    await page.clickSubmit()

    expect(mutations.lastFetchVariables).toMatchObject({
      input: {
        creditCardId: "credit-card-id",
        id: "1234",
      },
    })
  })

  it("takes the user to the review step", async () => {
    const page = await buildPage()
    await page.clickSubmit()
    expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/review")
  })

  it("shows an error modal when there is an error in SetOrderPaymentPayload", async () => {
    const page = await buildPage()
    mutations.useResultsOnce(settingOrderPaymentFailed)
    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  it("shows an error modal when there is a network error", async () => {
    const page = await buildPage()
    mutations.mockNetworkFailureOnce()

    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  describe("Offer-mode orders", () => {
    it("shows an active offer stepper if the order is an Offer Order", async () => {
      const page = await buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetails,
          },
        },
      })
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"checkOffer navigate rightcheckShipping navigate rightPaymentnavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })
  })

  describe("analytics", () => {
    const err = console.error
    beforeEach(() => {
      mockPostEvent.mockClear()
      // TODO: update to react 16.9 so we can use async `act`
      console.error = (...args) => {
        if (
          !args.some(
            a =>
              a &&
              a
                .toString()
                .match(
                  "code that causes React state updates should be wrapped into act"
                )
          )
        ) {
          err(...args)
        }
      }
    })

    afterEach(() => {
      console.error = err
    })
    it("tracks a pageview", async () => {
      await buildPage()
      expect(trackPageView).toHaveBeenCalledTimes(1)
    })

    it("tracks hovers over the bank transfer experiment", async () => {
      const page = await buildPage()
      expect(mockPostEvent).not.toHaveBeenCalled()
      page
        .find("#bank-transfer-hover-target")
        .at(0)
        .simulate("mouseenter")
      await page.update()
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "Hover",
        flow: "Buy now",
        subject: "addBankAccount",
        type: "radio button",
      })
    })

    it("tracks clicking the bank transfer experiment", async () => {
      const page = await buildPage()
      expect(mockPostEvent).not.toHaveBeenCalled()
      page
        .find(BankTransferExperiment)
        .find(BorderedRadio)
        .simulate("click")

      await page.update()

      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "Click",
        flow: "Buy now",
        subject: "addBankAccount",
        type: "radio button",
      })
    })

    it("tracks clicking the checkbox", async () => {
      const page = await buildPage()
      expect(mockPostEvent).not.toHaveBeenCalledWith()

      // open modal
      page
        .find(BankTransferExperiment)
        .find(BorderedRadio)
        .simulate("click")
      await page.update()
      await page.update()

      mockPostEvent.mockClear()

      page
        .find(BankTransferExperiment)
        .find(Checkbox)
        .simulate("click")

      await page.update()

      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "Click",
        flow: "Buy now",
        subject: "notifyCheckboxChecked",
        type: "email link",
        context_module: "BankTransferExperiment",
      })
    })

    it("tracks dismissing the modal", async () => {
      const page = await buildPage()
      expect(mockPostEvent).not.toHaveBeenCalledWith()

      // open modal
      page
        .find(BankTransferExperiment)
        .find(BorderedRadio)
        .simulate("click")

      // lol don't ask 😭
      await page.update()
      await page.update()

      mockPostEvent.mockClear()

      page
        .find(BankTransferExperiment)
        .find("CloseIcon")
        .simulate("click")

      await page.update()

      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "Click",
        flow: "Buy now",
        subject: "modalDismissed",
        type: "modal dismissal",
        context_module: "BankTransferExperiment",
      })
    })

    it("tracks clicking the email link", async () => {
      const page = await buildPage()
      expect(mockPostEvent).not.toHaveBeenCalledWith()

      // open modal
      page
        .find(BankTransferExperiment)
        .find(BorderedRadio)
        .simulate("click")

      // lol don't ask 😭
      await page.update()
      await page.update()

      mockPostEvent.mockClear()

      const link = page.find(BankTransferExperiment).find("a")
      expect(link.text()).toMatch("orders@artsy.net")

      link.simulate("click")

      await page.update()

      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "Click",
        flow: "Buy now",
        subject: "orders@artsy.net",
        type: "email link",
        context_module: "BankTransferExperiment",
      })
    })

    it("reports the correct flow", async () => {
      const page = await buildPage({
        mockData: {
          order: {
            ...testOrder,
            mode: "OFFER",
          },
        },
      })
      expect(mockPostEvent).not.toHaveBeenCalledWith()

      // open modal
      page
        .find(BankTransferExperiment)
        .find(BorderedRadio)
        .simulate("click")

      // lol don't ask 😭
      await page.update()
      await page.update()

      mockPostEvent.mockClear()

      const link = page.find(BankTransferExperiment).find("a")
      expect(link.text()).toMatch("orders@artsy.net")

      link.simulate("click")

      await page.update()

      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "Click",
        flow: "Make offer",
        subject: "orders@artsy.net",
        type: "email link",
        context_module: "BankTransferExperiment",
      })
    })
  })
})
