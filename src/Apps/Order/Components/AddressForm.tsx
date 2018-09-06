import { Serif } from "@artsy/palette"
import Input from "Components/Input"
import React from "react"
import { CountrySelect } from "Styleguide/Components"
import { Flex, Join, Spacer } from "Styleguide/Elements"
import { TwoColumnSplit } from "./TwoColumnLayout"

export interface Address {
  name: string
  country: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  phoneNumber: string
}

export const emptyAddress: Address = Object.freeze({
  name: "",
  country: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  phoneNumber: "",
})
export interface AddressFormProps {
  onChange(address: Address): void
  defaultValue?: Partial<Address>
  billing?: boolean
}

interface AddressFormState {
  address: Address
}

export class AddressForm extends React.Component<
  AddressFormProps,
  AddressFormState
> {
  state = {
    address: { ...emptyAddress, ...this.props.defaultValue },
  }

  changeEventHandler = (key: keyof Address) => (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    this.onChangeValue(key, ev.currentTarget.value)
  }

  changeValueHandler = (key: keyof Address) => (value: string) => {
    this.onChangeValue(key, value)
  }

  onChangeValue = (key: keyof Address, value: string) => {
    this.setState({ address: { ...this.state.address, [key]: value } }, () => {
      this.props.onChange({ ...this.state.address })
    })
  }

  render() {
    return (
      <Join separator={<Spacer mb={2} />}>
        <Flex flexDirection="column">
          <Input
            placeholder="Add full name"
            title="Full name"
            defaultValue={this.props.defaultValue.name}
            onChange={this.changeEventHandler("name")}
            block
          />
        </Flex>

        <TwoColumnSplit>
          <Flex flexDirection="column" pb={1}>
            <Serif mb={1} size="3t" color="black100" lineHeight={18}>
              Country
            </Serif>
            <CountrySelect
              selected={this.state.address.country}
              onSelect={this.changeValueHandler("country")}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add postal code"
              title="Postal code"
              onChange={this.changeEventHandler("postalCode")}
              block
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              placeholder="Add street address"
              title="Address line 1"
              onChange={this.changeEventHandler("addressLine1")}
              block
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add apt, floor, suite, etc."
              title="Address line 2 (optional)"
              onChange={this.changeEventHandler("addressLine2")}
              block
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              placeholder="Add city"
              title="City"
              onChange={this.changeEventHandler("city")}
              block
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add State, province, or region"
              title="State, province, or region"
              onChange={this.changeEventHandler("region")}
              block
            />
          </Flex>
        </TwoColumnSplit>
        {!this.props.billing && (
          <Flex flexDirection="column">
            <Input
              title="Phone"
              description="For shipping purposes only"
              placeholder="Add phone"
              onChange={this.changeEventHandler("phoneNumber")}
              block
            />
          </Flex>
        )}
      </Join>
    )
  }
}
