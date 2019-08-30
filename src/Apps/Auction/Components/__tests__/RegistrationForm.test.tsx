import { fillInForm, validAddress } from "Apps/Auction/__tests__/utils"
import { MockBoot } from "DevTools/MockBoot"
import { mount, ReactWrapper } from "enzyme"
import { Form } from "formik"
import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { RegistrationForm, RegistrationFormProps } from "../RegistrationForm"

const requiredFields = [
  "Name",
  "Country",
  "Address",
  "City",
  "State",
  "Postal code",
  "Telephone",
]

const onSubmit = jest.fn()

describe("RegistrationForm", () => {
  let wrapper: ReactWrapper
  const props: RegistrationFormProps = {
    onSubmit,
    trackSubmissionErrors: jest.fn(),
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
