import { Checkbox } from "@artsy/palette"
import { CountrySelect } from "Components/v2"
import { Form } from "formik"

export function fillInTextInput(wrapper, name, value) {
  const component = wrapper.find(Form).find(`input[name="${name}"]`)
  component.simulate("change", {
    target: { name, value },
  })
}

export function fillInForm(wrapper, address) {
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

export const validAddress = {
  name: "Artsy HQ",
  street: "401 Broadway",
  city: "New York",
  state: "NY",
  postalCode: "10013",
  country: "United States",
  telephone: "1234567878",
}
