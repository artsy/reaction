import { Address } from "Apps/Order/Components/AddressForm"
import { isEmpty } from "lodash"

export const validatePresence = (value: any): string => {
  return isEmpty(value) ? "This field is required" : null
}

export const validateAddress = (address: Address) => {
  const { name, addressLine1, city, region, country, postalCode } = address
  const usOrCanada = country === "US" || country === "CA"
  const errors = {
    name: validatePresence(name),
    addressLine1: validatePresence(addressLine1),
    city: validatePresence(city),
    region: usOrCanada && validatePresence(region),
    country: validatePresence(country),
    postalCode: usOrCanada && validatePresence(postalCode),
  }
  return {
    errors,
    hasErrors: Object.keys(errors).filter(key => errors[key]).length > 0,
  }
}
