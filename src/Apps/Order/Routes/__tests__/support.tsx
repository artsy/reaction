import { Address } from "Apps/Order/Components/AddressFields"
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

export const fillIn = (
  component: any,
  inputData: { title: string; value: string }
) => {
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().title === inputData.title)

  input.props().onChange({ currentTarget: { value: inputData.value } } as any)
}

export const fillInput = (component, name, value) => {
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().name === name)
  // input.getDOMNode().value = val
  // input.simulate("change")
  input.prop("onChange")({
    preventDefault: () => null,
    target: { name, value },
  })
}

export const fillCountrySelect = (component, value) => {
  const input = component.find(CountrySelect)

  input.props().onSelect(value)
}

export const fillAddressForm = (component, values: Partial<Address>) => {
  const { country: countryVal, ...inputVals } = values
  Object.keys(inputVals).forEach(name =>
    fillInput(component, name, inputVals[name])
  )
  countryVal && fillCountrySelect(component, "country", countryVal)
}
