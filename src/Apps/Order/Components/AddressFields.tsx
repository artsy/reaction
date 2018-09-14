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
export type Touched<T> = { [K in keyof T]?: boolean }
export type AddressField = keyof Address
export type AddressChangeHandler = (e: React.ChangeEvent<any>) => void

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

export interface AddressFieldsProps {
  onChange: AddressChangeHandler
  // onBlur?: AddressChangeHandler // TODO: not necessary?
  // defaultValue?: Partial<Address> // TODO: not necessary?
  errors: AddressErrors
  values: Address
  billing?: boolean
}

export class AddressFields extends React.Component<AddressFieldsProps> {
  startingAddress = {
    ...emptyAddress,
    ...this.props.values, // Was defaultValue
  }

  render() {
    const { values, errors } = this.props
    return (
      <Join separator={<Spacer mb={2} />}>
        <Flex flexDirection="column">
          <Input
            id="AddressFields_name"
            name="name"
            value={values.name}
            error={errors.name}
            placeholder="Add full name"
            title="Full name"
            onChange={this.props.onChange}
            block
            // defaultValue={values.name}
            // onBlur={this.props.onBlur}
          />
        </Flex>

        <TwoColumnSplit>
          <Flex flexDirection="column" pb={1}>
            <Serif mb={1} size="3t" color="black100" lineHeight={18}>
              Country
            </Serif>
            <CountrySelect
              name="country"
              // error={errors.country} // Add type to countrySelect
              selected={values.country}
              onSelect={this.props.onChange}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressFields_postalCode"
              name="postalCode"
              value={values.postalCode}
              error={errors.postalCode}
              placeholder="Add postal code"
              title="Postal code"
              onChange={this.props.onChange}
              block
              // defaultValue={values.postalCode}
              // onBlur={this.props.onBlur}
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              id="AddressFields_addressLine1"
              name="addressLine1"
              value={values.addressLine1}
              error={errors.addressLine1}
              placeholder="Add street address"
              title="Address line 1"
              onChange={this.props.onChange}
              block
              // defaultValue={values.addressLine1}
              // onBlur={this.props.onBlur}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressFields_addressLine2"
              name="addressLine2"
              value={values.addressLine2}
              error={errors.addressLine2}
              placeholder="Add apt, floor, suite, etc."
              title="Address line 2 (optional)"
              onChange={this.props.onChange}
              block
              // defaultValue={values.addressLine2}
              // onBlur={this.props.onBlur}
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              id="AddressFields_city"
              name="city"
              value={values.city}
              error={errors.city}
              placeholder="Add city"
              title="City"
              onChange={this.props.onChange}
              block
              // defaultValue={values.city}
              // onBlur={this.props.onBlur}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressFields_region"
              name="region"
              value={values.region}
              error={errors.region}
              placeholder="Add State, province, or region"
              title="State, province, or region"
              onChange={this.props.onChange}
              block
              // defaultValue={values.region}
              // onBlur={this.props.onBlur}
            />
          </Flex>
        </TwoColumnSplit>
        {!this.props.billing && (
          <Flex flexDirection="column">
            <Input
              id="AddressFields_phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              error={errors.phoneNumber}
              title="Phone"
              description="For shipping purposes only"
              placeholder="Add phone"
              onChange={this.props.onChange}
              block
              // onBlur={this.props.onBlur}
              // defaultValue={values.phoneNumber}
            />
          </Flex>
        )}
      </Join>
    )
  }
}
