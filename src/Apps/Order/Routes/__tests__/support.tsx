import { Address } from "Apps/Order/Components/AddressForm"
import Input from "Components/Input"
import { CountrySelect } from "Styleguide/Components"

export const validAddress: Address = {
  name: "Artsy UK Ltd",
  addressLine1: "14 Gower's Walk",
  addressLine2: "Suite 2.5, The Loom",
  city: "Whitechapel",
  region: "London",
  postalCode: "E1 8PY",
  country: "UK",
  phoneNumber: "8475937743",
}

const keysToTitles = {
  "Full Name": "name"
}

export const fillIn = (component, {title, with}) => {
  const nowAddress = component.find(AddressForm).prop('defaultValue')
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().title === title)
  // input.getDOMNode().value = val
  // input.simulate("change")
  const key = keysToTitles[title]
  input.prop("onChange")(
    { ...nowAddress, key: with }
  )

}

// export const fillInput = (component, name, value) => {
// }

export const fillCountrySelect = (component, name, value) => {
  const input = component
    .find(CountrySelect)
    .filterWhere(wrapper => wrapper.props().name === name)
  input.prop("onSelect")({
    preventDefault: () => null,
    target: { name, value },
  })
}

export const fillAddressForm = (component, values: Partial<Address>) => {
  const { country: countryVal, ...inputVals } = values
  Object.keys(inputVals).forEach(name =>
    fillInput(component, name, inputVals[name])
  )
  countryVal && fillCountrySelect(component, "country", countryVal)
}
