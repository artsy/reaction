import { Address } from "Components/AddressForm"
import Input from "Components/Input"
import { CountrySelect } from "Components/v2/CountrySelect"

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

export const fillInPhoneNumber = (
  component: any,
  inputData: { isPickup?: boolean; value: string }
) => {
  const index = inputData.isPickup ? 0 : 1
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().title === "Phone number")
    .at(index)
  input.props().onChange({ currentTarget: { value: inputData.value } } as any)
}

export const fillCountrySelect = (component, value) => {
  const input = component.find(CountrySelect)
  input.props().onSelect(value)
}
