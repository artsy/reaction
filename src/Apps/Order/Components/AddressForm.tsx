import { Flex, Join, Serif, Spacer } from "@artsy/palette"
import Input from "Components/Input"
import React from "react"
import { CountrySelect } from "Styleguide/Components"
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

export type AddressErrors = Partial<Address>
export type AddressChangeHandler = (
  address: Address,
  key: keyof Address
) => void

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
  onChange: AddressChangeHandler
  defaultValue?: Partial<Address>
  billing?: boolean
  errors?: AddressErrors
}

interface AddressFormState {
  address: Address
}

export class AddressForm extends React.Component<
  AddressFormProps,
  AddressFormState
> {
  state = {
    address: {
      ...emptyAddress,
      ...this.props.defaultValue,
    },
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
      this.props.onChange({ ...this.state.address }, key)
    })
  }

  render() {
    return (
      <Join separator={<Spacer mb={2} />}>
        <Flex flexDirection="column">
          <Input
            id="AddressForm_name"
            placeholder="Add full name"
            title="Full name"
            defaultValue={this.props.defaultValue.name}
            onChange={this.changeEventHandler("name")}
            error={this.props.errors && this.props.errors.name}
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
              id="AddressForm_postalCode"
              placeholder="Add postal code"
              title="Postal code"
              defaultValue={this.props.defaultValue.postalCode}
              onChange={this.changeEventHandler("postalCode")}
              error={this.props.errors && this.props.errors.postalCode}
              block
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              id="AddressForm_addressLine1"
              placeholder="Add street address"
              title="Address line 1"
              defaultValue={this.props.defaultValue.addressLine1}
              onChange={this.changeEventHandler("addressLine1")}
              error={this.props.errors && this.props.errors.addressLine1}
              block
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressForm_addressLine2"
              placeholder="Add apt, floor, suite, etc."
              title="Address line 2 (optional)"
              defaultValue={this.props.defaultValue.addressLine2}
              onChange={this.changeEventHandler("addressLine2")}
              block
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              id="AddressForm_city"
              placeholder="Add city"
              title="City"
              defaultValue={this.props.defaultValue.city}
              onChange={this.changeEventHandler("city")}
              error={this.props.errors && this.props.errors.city}
              block
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add State, province, or region"
              title="State, province, or region"
              defaultValue={this.props.defaultValue.region}
              onChange={this.changeEventHandler("region")}
              error={this.props.errors && this.props.errors.region}
              block
            />
          </Flex>
        </TwoColumnSplit>
        {!this.props.billing && (
          <Flex flexDirection="column">
            <Input
              id="AddressForm_phoneNumber"
              title="Phone"
              description="For shipping purposes only"
              placeholder="Add phone"
              defaultValue={this.props.defaultValue.phoneNumber}
              onChange={this.changeEventHandler("phoneNumber")}
              error={this.props.errors && this.props.errors.phoneNumber}
              block
            />
          </Flex>
        )}
      </Join>
    )
  }
}
