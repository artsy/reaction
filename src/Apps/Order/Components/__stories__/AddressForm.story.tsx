import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { Address, AddressForm } from "../../../../Components/AddressForm"

class TypicalAddressForm extends React.Component<
  {
    address?: Address
    billing?: boolean
    domesticOnly?: boolean
    euOrigin?: boolean
    shippingCountry?: string
  },
  Address
> {
  constructor(props) {
    super(props)
    this.state = props.address || {}
  }

  onChange = address => {
    this.setState(address)
  }

  render() {
    return (
      <AddressForm
        value={this.state}
        onChange={this.onChange}
        errors={{}}
        touched={{}}
        billing={this.props.billing}
        domesticOnly={this.props.domesticOnly}
        euOrigin={this.props.euOrigin}
        shippingCountry={this.props.shippingCountry}
      />
    )
  }
}

storiesOf("Apps/Order/Components", module).add("AddressForm", () => {
  return (
    <>
      <Section title="Blank">
        <Flex flexDirection="column">
          <TypicalAddressForm />
        </Flex>
      </Section>
      <Section title="BlankDomesticOnly">
        <Flex flexDirection="column">
          <TypicalAddressForm shippingCountry="US" domesticOnly />
        </Flex>
      </Section>
      <Section title="BlankDomesticEUOnly">
        <Flex flexDirection="column">
          <TypicalAddressForm shippingCountry="DE" domesticOnly euOrigin />
        </Flex>
      </Section>
      <Section title="Filled out">
        <Flex flexDirection="column">
          <TypicalAddressForm
            address={{
              name: "Joelle Van Dyne",
              country: "US",
              postalCode: "10013",
              addressLine1: "401 Broadway",
              addressLine2: "Suite 25",
              city: "New York",
              region: "NY",
              phoneNumber: "120938120983",
            }}
          />
        </Flex>
      </Section>
    </>
  )
})
