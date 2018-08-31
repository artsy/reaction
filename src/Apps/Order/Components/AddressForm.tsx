import { Serif } from "@artsy/palette"
import Input from "Components/Input"
import React from "react"
import { CountrySelect } from "Styleguide/Components"
import { Flex, Join, Spacer } from "Styleguide/Elements"
import { TwoColumnSplit } from "./TwoColumnLayout"

interface AddressFormProps {
  country?: string
  onUpdateName?: (e: any) => void
  onUpdateCountry?: (e: any) => void
  onUpdatePostalCode?: (e: any) => void
  onUpdateAddressLine1?: (e: any) => void
  onUpdateAddressLine2?: (e: any) => void
  onUpdateCity?: (e: any) => void
  onUpdateRegion?: (e: any) => void
}

export class AddressForm extends React.Component<AddressFormProps> {
  render() {
    return (
      <Join separator={<Spacer mb={2} />}>
        <Flex flexDirection="column">
          <Input
            placeholder="Add full name"
            title="Full name"
            onChange={this.props.onUpdateName}
            block
          />
        </Flex>

        <TwoColumnSplit>
          <Flex flexDirection="column" pb={1}>
            <Serif mb={1} size="3t" color="black100" lineHeight={18}>
              Country
            </Serif>
            <CountrySelect
              selected={this.props.country}
              onSelect={this.props.onUpdateCountry}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add postal code"
              title="Postal code"
              onChange={this.props.onUpdatePostalCode}
              block
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              placeholder="Add street address"
              title="Address line 1"
              onChange={this.props.onUpdateAddressLine1}
              block
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add apt, floor, suite, etc."
              title="Address line 2 (optional)"
              onChange={this.props.onUpdateAddressLine2}
              block
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              placeholder="Add city"
              title="City"
              onChange={this.props.onUpdateCity}
              block
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              placeholder="Add State, province, or region"
              title="State, province, or region"
              onChange={this.props.onUpdateRegion}
              block
            />
          </Flex>
        </TwoColumnSplit>
      </Join>
    )
  }
}
