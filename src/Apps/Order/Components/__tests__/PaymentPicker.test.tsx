import { Checkbox, Collapse } from "@artsy/palette"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { creatingCreditCardSuccess } from "Apps/Order/Routes/__fixtures__/MutationResults"
import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "Apps/Order/Routes/__tests__/Utils/addressForm"
import { injectCommitMutation } from "Apps/Order/Utils/commitMutation"
import { Input } from "Components/Input"
import { createTestEnv } from "DevTools/createTestEnv"
import { RootTestPage } from "DevTools/RootTestPage"
import React from "react"
import { graphql } from "react-relay"
import { Address, AddressForm } from "../AddressForm"
import { PaymentPicker, PaymentPickerFragmentContainer } from "../PaymentPicker"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

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

const createTokenMock = require("react-stripe-elements").__stripeMock
  .createToken as jest.Mock

createTokenMock.mockImplementation(() =>
  Promise.resolve({ error: "bad error" })
)

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

describe(PaymentPickerFragmentContainer, () => {
  const env = createTestEnv({
    Component: injectCommitMutation(PaymentPickerFragmentContainer as any),
    TestPage: class PaymentPickerTestPage extends RootTestPage {
      getCreditCardId: PaymentPicker["getCreditCardId"] = async () => {
        const result = (this.find(
          PaymentPicker
        ).instance() as any).getCreditCardId()
        await this.update()
        return result
      }

      get nameInput() {
        return this.find("input[placeholder='Add full name']")
      }

      get sameAddressCheckbox() {
        return this.find(Checkbox).filterWhere(cb =>
          cb.text().includes("are the same")
        )
      }

      get saveCardCheckbox() {
        return this.find(Checkbox).filterWhere(cb => cb.text().includes("Save"))
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
    defaultData: {
      me: {
        creditCards: {
          edges: [],
        },
      },
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
    defaultMutationResults: {
      ...creatingCreditCardSuccess,
    },
    query: graphql`
      query PaymentPickerTestQuery {
        me {
          ...PaymentPicker_me
        }
        order: ecommerceOrder(id: "unused") {
          ...PaymentPicker_order
        }
      }
    `,
  })

  beforeEach(() => {
    mockPostEvent.mockReset()
    createTokenMock.mockReset()
    createTokenMock.mockImplementation(() =>
      Promise.resolve({ error: "bad error" })
    )
  })

  it("always shows the billing address form without checkbox when the user selected 'pick' shipping option", async () => {
    const page = await env.buildPage({
      mockData: {
        order: BuyOrderPickup,
      },
    })
    expect(page.sameAddressCheckbox).toHaveLength(0)
    expect(page.text()).not.toMatch(
      "Billing and shipping addresses are the same."
    )
    expect(
      page
        .find(Collapse)
        .at(0)
        .props().open
    ).toBe(true)
  })

  it("removes all data when the billing address form is hidden", async () => {
    const page = await env.buildPage()
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
    const page = await env.buildPage({
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
    const page = await env.buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          id: "1234",
        },
      },
    })

    fillAddressForm(page.root, validAddress)

    await page.getCreditCardId()

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
    const page = await env.buildPage()

    await page.getCreditCardId()

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
    const page = await env.buildPage()
    await page.toggleSameAddressCheckbox()
    fillAddressForm(page.root, validAddress)
    await page.getCreditCardId()

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

    const page = await env.buildPage()
    await page.getCreditCardId()

    expect(env.mutations.mockFetch.mock.calls[0][1]).toMatchObject({
      input: {
        token: "tokenId",
      },
    })
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

    const page = await env.buildPage()

    expect(page.root.text()).not.toContain("Your card number is invalid.")

    await page.getCreditCardId()

    expect(page.root.text()).toContain("Your card number is invalid.")
  })

  describe("Analytics", () => {
    it("tracks click when use shipping address checkbox transitions from checked to unchecked but not from unchecked to checked", async () => {
      const page = await env.buildPage()
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
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()
      await page.getCreditCardId()

      const input = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "Full name")
      console.log()
      expect(input.props().error).toEqual("This field is required")
    })

    it("before submit, only shows a validation error on inputs that have been touched", async () => {
      const page = await env.buildPage()
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
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

      fillIn(page.root, { title: "Full name", value: "Erik David" })

      await page.getCreditCardId()

      const cityInput = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "City")

      expect(cityInput.props().error).toBeTruthy()
    })

    it("does not submit an empty form with billing address exposed", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()
      await page.getCreditCardId()

      expect(env.mutations.mockFetch).not.toBeCalled()
    })

    it("does not submit the mutation with an incomplete form with billing address exposed", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()
      await page.getCreditCardId()
      expect(env.mutations.mockFetch).not.toBeCalled()
    })

    it("allows a missing postal code if the selected country is not US or Canada", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
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
      await page.getCreditCardId()
      expect(createTokenMock).toBeCalled()
      expect(env.mutations.mockFetch).toBeCalledTimes(1)
    })

    it("allows a missing state/province if the selected country is not US or Canada", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
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

      await page.getCreditCardId()

      expect(createTokenMock).toBeCalled()
      expect(env.mutations.mockFetch).toBeCalledTimes(1)
    })
  })
})
