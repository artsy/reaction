import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils"
import { Address, AddressForm } from "../AddressForm"

class TypicalAddressForm extends React.Component<
  { address?: Address },
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
      />
    )
  }
}

storiesOf("Apps/Order Page/Components", module).add("AddressForm", () => {
  return (
    <>
      <Section title="Blank">
        <Flex flexDirection="column">
          <TypicalAddressForm />
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
