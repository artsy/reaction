import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Media } from "Utils/Responsive"
import { AddressForm } from "../AddressForm"

const defaultAddress = {
  value: {
    name: "Joelle Van Dyne",
    country: "US",
    postalCode: "10013",
    addressLine1: "401 Broadway",
    addressLine2: "Suite 25",
    city: "New York",
    region: "NY",
    phoneNumber: "120938120983",
  },
  errors: {},
  touched: {},
  continentalUsOnly: false,
}

class GoodAddressForm extends React.Component {
  state = defaultAddress
  onChange = address => {
    this.setState({ value: address })
  }
  render() {
    return <AddressForm {...this.state as any} onChange={this.onChange} />
  }
}

class BadAddressForm extends React.Component {
  state = defaultAddress
  onChange = address => {
    this.setState({ value: address })
  }
  render() {
    return (
      <>
        <Media at="xs">no form when small!</Media>
        <Media greaterThan="xs">
          <Flex flexDirection="column">
            <AddressForm {...this.state as any} onChange={this.onChange} />
          </Flex>
        </Media>
      </>
    )
    return
  }
}

storiesOf("Apps/Order Page/Components", module).add("AddressForm", () => {
  return (
    <>
      <Section title="(OK) Address Form">
        <Media at="xs">no form when small!</Media>
        <Media greaterThan="xs">
          <Flex flexDirection="column">
            <GoodAddressForm />
          </Flex>
        </Media>
      </Section>
      <Section title="(Broken) Address Form">
        <BadAddressForm />
      </Section>
    </>
  )
})
