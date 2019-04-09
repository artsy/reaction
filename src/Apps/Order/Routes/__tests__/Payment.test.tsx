import { Checkbox } from "@artsy/palette"

import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import {
  settingOrderPaymentFailed,
  settingOrderPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { PaymentFragmentContainer } from "../Payment"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("Apps/Order/Utils/trackPageView")
jest.mock(
  "Apps/Order/Components/PaymentPicker",
  // not sure why this is necessary :(
  // should just work without this extra argument
  () => {
    return require("../../Components/__mocks__/PaymentPicker")
  }
)

import * as paymentPickerMock from "../../Components/__mocks__/PaymentPicker"

import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import { graphql } from "react-relay"
import { AddressForm } from "../../Components/AddressForm"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

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
        order: ecommerceOrder(id: "unused") {
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
      "An error occurred",
      "This is the description of an error."
    )
  })

  it("commits setOrderPayment mutation with the credit card id", async () => {
    const page = await buildPage()
    await page.clickSubmit()

    expect(mutations.lastFetchVariables).toMatchObject({
      input: {
        creditCardId: "credit-card-id",
        orderId: "1234",
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

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
