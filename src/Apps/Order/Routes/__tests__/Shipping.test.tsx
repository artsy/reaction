import { cloneDeep } from "lodash"

import { RadioGroup } from "@artsy/palette"
import {
  UntouchedBuyOrder,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { Address } from "Apps/Order/Components/AddressForm"
import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "Apps/Order/Routes/__tests__/Utils/addressForm"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import Input from "Components/Input"
import { CountrySelect } from "Components/v2"
import { createTestEnv } from "DevTools/createTestEnv"
import { commitMutation as _commitMutation, graphql } from "react-relay"
import {
  settingOrderShipmentFailure,
  settingOrderShipmentMissingCountryFailure,
  settingOrderShipmentMissingRegionFailure,
  settingOrderShipmentSuccess,
} from "../__fixtures__/MutationResults"
import { ShippingFragmentContainer } from "../Shipping"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

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
  fillIn(component, { title: "Phone number", value: address.phoneNumber })
  fillCountrySelect(component, address.country)
}

const testOrder = { ...UntouchedBuyOrder, id: "1234" }

class ShippingTestPage extends OrderAppTestPage {
  async selectPickupOption() {
    this.find("Radio")
      .last()
      .simulate("click")
    await this.update()
  }
}

describe("Shipping", () => {
  const { mutations, buildPage, routes } = createTestEnv({
    Component: ShippingFragmentContainer,
    defaultData: { order: testOrder },
    defaultMutationResults: {
      ...settingOrderShipmentSuccess,
    },
    query: graphql`
      query ShippingTestQuery {
        order: ecommerceOrder(id: "unused") {
          ...Shipping_order
        }
      }
    `,
    TestPage: ShippingTestPage,
  })

  it("removes radio group if pickup_available flag is false", async () => {
    const pickupAvailableOrder = cloneDeep(testOrder) as any
    pickupAvailableOrder.lineItems.edges[0].node.artwork.pickup_available = false
    const page = await buildPage({ mockData: { order: pickupAvailableOrder } })
    expect(page.find(RadioGroup).length).toEqual(0)
  })

  it("disables country select when shipsToContinentalUSOnly is true", async () => {
    const continentalUSOnlyOrder = cloneDeep(testOrder) as any
    continentalUSOnlyOrder.lineItems.edges[0].node.artwork.shipsToContinentalUSOnly = true
    const page = await buildPage({
      mockData: { order: continentalUSOnlyOrder },
    })
    expect(page.find(CountrySelect).props().disabled).toBe(true)
  })

  it("commits the mutation with the orderId", async () => {
    const page = await buildPage()

    fillAddressForm(page.root, validAddress)

    expect(mutations.mockFetch).not.toHaveBeenCalled()
    await page.clickSubmit()

    expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
    expect(mutations.lastFetchVariables).toMatchInlineSnapshot(`
Object {
  "input": Object {
    "fulfillmentType": "SHIP",
    "orderId": "1234",
    "shipping": Object {
      "addressLine1": "14 Gower's Walk",
      "addressLine2": "Suite 2.5, The Loom",
      "city": "Whitechapel",
      "country": "UK",
      "name": "Artsy UK Ltd",
      "phoneNumber": "8475937743",
      "postalCode": "E1 8PY",
      "region": "London",
    },
  },
}
`)
  })

  it("commits the mutation with shipping option", async () => {
    const page = await buildPage()

    fillAddressForm(page.root, {
      ...validAddress,
      region: "New Brunswick",
      country: "US",
    })

    await page.clickSubmit()
    expect(mutations.lastFetchVariables.input.shipping.region).toBe(
      "New Brunswick"
    )
    expect(mutations.lastFetchVariables.input.shipping.country).toBe("US")
  })

  it("commits the mutation with pickup option", async () => {
    const page = await buildPage()
    await page.selectPickupOption()
    expect(mutations.mockFetch).not.toHaveBeenCalled()
    await page.clickSubmit()
    expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
    expect(mutations.lastFetchVariables.input.fulfillmentType).toBe("PICKUP")
  })

  describe("mutation", () => {
    let page: ShippingTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("routes to payment screen after mutation completes", async () => {
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/payment")
    })

    it("shows the button spinner while loading the mutation", async () => {
      fillAddressForm(page.root, validAddress)
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(settingOrderShipmentFailure)
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      fillAddressForm(page.root, validAddress)
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows a validation error modal when there is a missing_country error from the server", async () => {
      mutations.useResultsOnce(settingOrderShipmentMissingCountryFailure)
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Invalid address",
        "There was an error processing your address. Please review and try again."
      )
    })

    it("shows a validation error modal when there is a missing_region error from the server", async () => {
      mutations.useResultsOnce(settingOrderShipmentMissingRegionFailure)
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Invalid address",
        "There was an error processing your address. Please review and try again."
      )
    })
  })

  describe("with previously filled-in data", () => {
    let page: ShippingTestPage
    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...testOrder,
            requestedFulfillment: {
              ...validAddress,
              __typename: "Ship",
              name: "Dr Collector",
            },
          },
        },
      })
    })

    it("includes already-filled-in data if available", () => {
      const input = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "Full name")

      expect(input.props().value).toBe("Dr Collector")
    })

    it("includes already-filled-in data in mutation if re-sent", async () => {
      await page.clickSubmit()
      expect(mutations.lastFetchVariables.input).toMatchObject({
        shipping: {
          name: "Dr Collector",
        },
      })
    })
  })

  describe("Validations", () => {
    let page: ShippingTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    describe("for Ship orders", () => {
      it("does not submit an empty form for a SHIP order", async () => {
        await page.clickSubmit()
        expect(mutations.mockFetch).not.toBeCalled()
      })

      it("does not submit the mutation with an incomplete form for a SHIP order", async () => {
        fillIn(page.root, { title: "Full name", value: "Air Bud" })
        await page.clickSubmit()
        expect(mutations.mockFetch).not.toBeCalled()
      })

      it("does submit the mutation with a complete form for a SHIP order", async () => {
        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()
        expect(mutations.mockFetch).toBeCalled()
      })

      it("says a required field is required for a SHIP order", async () => {
        await page.clickSubmit()
        const input = page
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "Full name")
        expect(input.props().error).toEqual("This field is required")
      })

      it("allows a missing postal code if the selected country is not US or Canada", async () => {
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

        const input = page
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "Postal code")
        expect(input.props().error).toBeFalsy()

        expect(mutations.mockFetch).toBeCalled()
      })

      it("before submit, only shows a validation error on inputs that have been touched", async () => {
        fillIn(page.root, { title: "Full name", value: "Erik David" })
        fillIn(page.root, { title: "Address line 1", value: "" })

        await page.update()

        const [addressInput, cityInput] = ["Address line 1", "City"].map(
          label =>
            page
              .find(Input)
              .filterWhere(wrapper => wrapper.props().title === label)
        )

        expect(addressInput.props().error).toBeTruthy()
        expect(cityInput.props().error).toBeFalsy()
      })

      it("after submit, shows all validation errors on inputs that have been touched", async () => {
        fillIn(page.root, { title: "Full name", value: "Erik David" })

        await page.clickSubmit()

        const cityInput = page.root
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "City")

        expect(cityInput.props().error).toBeTruthy()
      })

      it("allows a missing state/province if the selected country is not US or Canada", async () => {
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
        expect(mutations.mockFetch).toBeCalled()
      })
    })

    it("does submit the mutation with a non-ship order", async () => {
      await page.selectPickupOption()
      await page.clickSubmit()
      expect(mutations.mockFetch).toBeCalled()
    })
  })

  describe("Offer-mode orders", () => {
    it("shows an active offer stepper if the order is an Offer Order", async () => {
      const page = await buildPage({
        mockData: {
          order: UntouchedOfferOrder,
        },
      })
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"Offer ShippingPaymentReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Shipping")
    })
  })

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
