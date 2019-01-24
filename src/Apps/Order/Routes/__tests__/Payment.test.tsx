import { Checkbox } from "@artsy/palette"
import React from "react"

import { Collapse } from "@artsy/palette"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "Apps/Order/Routes/__tests__/Utils/addressForm"
import { Input } from "../../../../Components/Input"
import {
  creatingCreditCardFailed,
  creatingCreditCardSuccess,
  settingOrderPaymentFailed,
  settingOrderPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { PaymentFragmentContainer } from "../Payment"

jest.mock("react-stripe-elements", () => {
  // tslint:disable-next-line:no-shadowed-variable
  const stripeMock = {
    createToken: jest.fn(),
  }
  return {
    CardElement: ({ onReady, hidePostalCode, ...props }) => <div {...props} />,
    __stripeMock: stripeMock,
    injectStripe: Component => props => (
      <Component stripe={stripeMock} {...props} />
    ),
  }
})

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock
const createTokenMock = require("react-stripe-elements").__stripeMock
  .createToken as jest.Mock

jest.mock("Apps/Order/Utils/trackPageView")

import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import { graphql } from "react-relay"
import { Address, AddressForm } from "../../Components/AddressForm"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

const fillAddressForm = (component: any, address: Address) => {
  fillIn(component, { title: "Full name", value: address.name })
  fillIn(component, { title: "Address line 1", value: address.addressLine1 })
  fillIn(component, {
    title: "Address line 2 (optional)",
    value: address.addressLine2,
  })
  fillIn(component, { title: "City", value: address.city })
  fillIn(component, {
    title: "State, province, or region",
    value: address.region,
  })
  fillIn(component, { title: "Postal code", value: address.postalCode })
  fillCountrySelect(component, address.country)
}

const testOrder = { ...BuyOrderWithShippingDetails, id: "1234" }

describe("Payment", () => {
  const { buildPage, mutations, routes } = createTestEnv({
    Component: PaymentFragmentContainer,
    defaultData: {
      order: testOrder,
    },
    defaultMutationResults: {
      ...creatingCreditCardSuccess,
      ...settingOrderPaymentSuccess,
    },
    query: graphql`
      query PaymentTestQuery {
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

  beforeEach(() => {
    mockPostEvent.mockReset()
    createTokenMock.mockReset()
    createTokenMock.mockImplementation(() => Promise.resolve())
  })

  it("always shows the billing address form without checkbox when the user selected 'pick' shipping option", async () => {
    const page = await buildPage({
      mockData: {
        order: BuyOrderPickup,
      },
    })
    expect(page.find(Checkbox).length).toBe(0)
    expect(page.find(Collapse).props().open).toBe(true)
  })

  it("removes all data when the billing address form is hidden", async () => {
    const page = await buildPage()
    // expand address form
    expect(page.sameAddressCheckbox.props().selected).toBe(true)
    await page.toggleSameAddressCheckbox()
    page.setName("Dr Collector")

    expect((page.nameInput.instance() as any).value).toEqual("Dr Collector")

    // hide address form
    page.toggleSameAddressCheckbox()

    // expand address form again
    page.toggleSameAddressCheckbox()

    // expect name to be empty
    expect((page.nameInput.instance() as any).value).toEqual("")
  })

  it("does not pre-populate with available details when returning to the payment route", async () => {
    const page = await buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          id: "1234",
          creditCard: {
            name: "Artsy UK Ltd",
            street1: "14 Gower's Walk",
            street2: "Suite 2.5, The Loom",
            city: "London",
            state: "Whitechapel",
            country: "UK",
            postal_code: "E1 8PY",
          },
        },
      },
    })

    expect(page.addressForm.props().value).toEqual({
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
      postalCode: "",
      country: "US",
      phoneNumber: "",
    })
  })

  it("always uses the billing address for stripe tokenization when the user selected 'pick' shipping option", async () => {
    const page = await buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          id: "1234",
        },
      },
    })

    fillAddressForm(page.root, validAddress)

    await page.clickSubmit()

    expect(createTokenMock).toHaveBeenCalledWith({
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
  })

  it("tokenizes credit card information using shipping address as billing address", async () => {
    const page = await buildPage()

    await page.clickSubmit()

    expect(createTokenMock).toHaveBeenCalledWith({
      name: "Joelle Van Dyne",
      address_line1: "401 Broadway",
      address_line2: "Suite 25",
      address_city: "New York",
      address_state: "NY",
      address_zip: "10013",
      address_country: "US",
    })
  })

  it("tokenizes credit card information with a different billing address", async () => {
    const page = await buildPage()
    await page.toggleSameAddressCheckbox()
    fillAddressForm(page.root, validAddress)
    await page.clickSubmit()

    expect(createTokenMock).toHaveBeenCalledWith({
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
  })

  it("commits createCreditCard mutation with stripe token id", async () => {
    const stripeToken: stripe.TokenResponse = {
      token: {
        id: "tokenId",
        object: null,
        client_ip: null,
        created: null,
        livemode: null,
        type: null,
        used: null,
      },
    }

    createTokenMock.mockReturnValue(Promise.resolve(stripeToken))

    const page = await buildPage()
    await page.clickSubmit()

    expect(mutations.mockFetch.mock.calls[0][1]).toMatchObject({
      input: {
        token: "tokenId",
      },
    })
  })

  it("shows the button spinner while loading the mutation", async () => {
    const page = await buildPage()
    fillAddressForm(page.root, validAddress)
    await page.expectButtonSpinnerWhenSubmitting()
  })

  it("shows an error message when CreateToken passes in an error", async () => {
    const stripeError: stripe.TokenResponse = {
      error: {
        type: null,
        charge: null,
        message: "Your card number is invalid.",
        code: null,
        decline_code: null,
        param: null,
      },
    }

    createTokenMock.mockReturnValue(Promise.resolve(stripeError))

    const page = await buildPage()

    expect(page.root.text()).not.toContain("Your card number is invalid.")

    await page.clickSubmit()

    expect(page.root.text()).toContain("Your card number is invalid.")
  })

  it("shows an error modal when CreateToken raises an error", async () => {
    createTokenMock.mockImplementation(() =>
      Promise.reject(new Error("something failed"))
    )
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectDefaultErrorDialog()
  })

  it("commits setOrderPayment mutation with Gravity credit card id", async () => {
    createTokenMock.mockReturnValue(
      Promise.resolve({ token: { id: "tokenId" } })
    )

    const page = await buildPage()
    await page.clickSubmit()

    expect(mutations.lastFetchVariables).toMatchObject({
      input: {
        creditCardId: "gravityCreditCardId",
        orderId: "1234",
      },
    })
  })

  it("takes the user to the review step", async () => {
    createTokenMock.mockReturnValue(
      Promise.resolve({ token: { id: "tokenId" } })
    )
    const page = await buildPage()
    await page.clickSubmit()
    expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/review")
  })

  it("shows an error modal when there is an error in CreateCreditCardPayload", async () => {
    createTokenMock.mockReturnValue(
      Promise.resolve({ token: { id: "tokenId" } })
    )

    const page = await buildPage()

    mutations.useResultsOnce(creatingCreditCardFailed)

    await page.clickSubmit()
    await page.expectErrorDialogMatching(
      "An error occurre",
      "No such token: fake-token"
    )
  })

  it("shows an error modal when there is an error in SetOrderPaymentPayload", async () => {
    createTokenMock.mockReturnValue(
      Promise.resolve({ token: { id: "tokenId" } })
    )
    const page = await buildPage()
    mutations.useResultsOnce(settingOrderPaymentFailed)
    await page.clickSubmit()
    await page.expectDefaultErrorDialog()
  })

  it("shows an error modal when there is a network error", async () => {
    createTokenMock.mockReturnValue(
      Promise.resolve({ token: { id: "tokenId" } })
    )
    const page = await buildPage()
    mutations.mockNetworkFailureOnce()

    await page.clickSubmit()
    await page.expectDefaultErrorDialog()
  })

  describe("Analytics", () => {
    it("tracks click when use shipping address checkbox transitions from checked to unchecked but not from unchecked to checked", async () => {
      const page = await buildPage()
      // Initial state is checked
      await page.toggleSameAddressCheckbox()
      expect(mockPostEvent).toBeCalledWith({
        action_type: "Click",
        subject: "use shipping address",
        flow: "buy now",
        type: "checkbox",
      })
      expect(mockPostEvent).toHaveBeenCalledTimes(1)

      mockPostEvent.mockClear()

      // State is now unchecked
      await page.toggleSameAddressCheckbox()

      expect(mockPostEvent).not.toBeCalled()
    })
  })

  describe("Validations", () => {
    it("says a required field is required with billing address exposed", async () => {
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()
      await page.clickSubmit()

      const input = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "Full name")
      expect(input.props().error).toEqual("This field is required")
    })

    it("before submit, only shows a validation error on inputs that have been touched", async () => {
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()

      fillIn(page.root, { title: "Full name", value: "Erik David" })
      fillIn(page.root, { title: "Address line 1", value: "" })
      page.root.update()

      const [addressInput, cityInput] = ["Address line 1", "City"].map(label =>
        page.find(Input).filterWhere(wrapper => wrapper.props().title === label)
      )

      expect(addressInput.props().error).toBeTruthy()
      expect(cityInput.props().error).toBeFalsy()
    })

    it("after submit, shows all validation errors on inputs that have been touched", async () => {
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()

      fillIn(page.root, { title: "Full name", value: "Erik David" })

      await page.clickSubmit()

      const cityInput = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "City")

      expect(cityInput.props().error).toBeTruthy()
    })

    it("does not submit an empty form with billing address exposed", async () => {
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()
      await page.clickSubmit()

      expect(mutations.mockFetch).not.toBeCalled()
    })

    it("does not submit the mutation with an incomplete form with billing address exposed", async () => {
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()
      await page.clickSubmit()
      expect(mutations.mockFetch).not.toBeCalled()
    })

    it("allows a missing postal code if the selected country is not US or Canada", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()

      const address = {
        name: "Erik David",
        addressLine1: "401 Broadway",
        addressLine2: "",
        city: "New York",
        region: "NY",
        postalCode: "",
        phoneNumber: "5555937743",
        country: "AQ",
      }

      fillAddressForm(page.root, address)
      await page.clickSubmit()
      expect(createTokenMock).toBeCalled()
      expect(mutations.mockFetch).toBeCalledTimes(2)
    })

    it("allows a missing state/province if the selected country is not US or Canada", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await buildPage()
      await page.toggleSameAddressCheckbox()

      const address = {
        name: "Erik David",
        addressLine1: "401 Broadway",
        addressLine2: "",
        city: "New York",
        region: "",
        postalCode: "7Z",
        phoneNumber: "5555937743",
        country: "AQ",
      }
      fillAddressForm(page.root, address)

      await page.clickSubmit()

      expect(createTokenMock).toBeCalled()
      expect(mutations.mockFetch).toBeCalledTimes(2)
    })
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
        `"Offer Shipping PaymentReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })
  })

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
