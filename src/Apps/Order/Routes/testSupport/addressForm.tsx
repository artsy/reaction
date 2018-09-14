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

export const fillIn = (
  component: any,
  inputData: { title: string; value: string }
) => {
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().title === inputData.title)

  input.props().onChange({ currentTarget: { value: inputData.value } } as any)
}

export const fillCountrySelect = (component, value) => {
  const input = component.find(CountrySelect)

  input.props().onSelect(value)
}
