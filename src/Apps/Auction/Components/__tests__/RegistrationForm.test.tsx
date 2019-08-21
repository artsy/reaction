import { Checkbox } from "@artsy/palette"
import { CountrySelect } from "Components/v2"
import { MockBoot } from "DevTools/MockBoot"
import { mount, ReactWrapper } from "enzyme"
import { Form } from "formik"
import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { RegistrationForm, RegistrationFormProps } from "../RegistrationForm"

function fillInTextInput(wrapper, name, value) {
  const component = wrapper.find(Form).find(`input[name="${name}"]`)
  component.simulate("change", {
    target: { name, value },
  })
}

function fillInForm(wrapper, address) {
  Object.keys(address).forEach(key => {
    if (key === "country") {
      return
    }

    fillInTextInput(wrapper, key, validAddress[key])
  })

  if (address.country) {
    wrapper
      .find(CountrySelect)
      .props()
      .onSelect(address.country)
  }

  wrapper
    .find(Checkbox)
    .props()
    .onSelect(true)
}

const requiredFields = [
  "Name",
  "Country",
  "Address",
  "City",
  "State",
  "Postal code",
  "Telephone",
]

export const validAddress = {
  name: "Artsy HQ",
  street: "401 Broadway",
  city: "New York",
  state: "NY",
  postalCode: "10013",
  country: "United States",
  telephone: "1234567878",
}

const onSubmit = jest.fn()

describe("RegistrationForm", () => {
  let wrapper: ReactWrapper
  const props: RegistrationFormProps = {
    onSubmit,
  }

  beforeAll(() => {
    wrapper = mount(
      <MockBoot>
        <StripeProvider stripe={null}>
          <Elements>
            <RegistrationForm onSubmit={onSubmit} {...props} />
          </Elements>
        </StripeProvider>
      </MockBoot>
    )
  })

  afterAll(() => {
    onSubmit.mockReset()
  })

  it("renders the registration form", () => {
    expect(wrapper.find(RegistrationForm).length).toEqual(1)
    expect(wrapper.text()).toMatch("Card Information")
    expect(wrapper.text()).toMatch("Billing Address")
    expect(wrapper.text()).toMatch("Agree to Conditions of Sale")
  })

  it("handles form validation", async () => {
    wrapper.find(Form).simulate("submit")
    await flushPromiseQueue()

    requiredFields.forEach(value => {
      expect(wrapper.text()).toMatch(`${value} is required`)
    })

    fillInForm(wrapper, validAddress)

    await flushPromiseQueue()

    expect(wrapper.text()).not.toMatch("Name is required")
  })
})
