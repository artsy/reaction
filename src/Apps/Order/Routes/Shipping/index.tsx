import { Serif } from "@artsy/palette"
import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import Input from "Components/Input"
import { Link } from "Router"
import { CountrySelect } from "Styleguide/Components/CountrySelect"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Join } from "Styleguide/Elements/Join"
import { RadioGroup } from "Styleguide/Elements/RadioGroup"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

import { SummaryFragmentContainer as Summary } from "../../Components/Summary"

import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { Col, Row } from "Styleguide/Elements/Grid"
import {
  TwoColumnLayout,
  TwoColumnSplit,
} from "../../Components/TwoColumnLayout"

export interface ShippingProps {
  order: Shipping_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class ShippingRoute extends Component<ShippingProps> {
  render() {
    const { order } = this.props
    return (
      <>
        <Row>
          <Col>
            <BuyNowStepper currentStep={"shipping"} />
          </Col>
        </Row>

        <Spacer mb={3} />
        <Responsive>
          {({ xs }) => (
            <TwoColumnLayout
              Content={
                <>
                  <RadioGroup
                    onSelect={id => id}
                    options={[
                      { label: "Provide shipping address", id: "SHIP" },
                      { label: "Arrange for pickup", id: "PICKUP" },
                    ]}
                  />
                  <Spacer mb={3} />

                  <Join separator={<Spacer mb={2} />}>
                    <Flex flexDirection="column">
                      <Input
                        placeholder="Add full name"
                        title="Full name"
                        block
                      />
                    </Flex>

                    <TwoColumnSplit>
                      <Flex flexDirection="column" pb={1}>
                        <Serif
                          mb={1}
                          size="3t"
                          color="black100"
                          lineHeight={18}
                        >
                          Country
                        </Serif>
                        <CountrySelect selected="US" />
                      </Flex>

                      <Flex flexDirection="column">
                        <Input
                          placeholder="Add postal code"
                          title="Postal code"
                          block
                        />
                      </Flex>
                    </TwoColumnSplit>
                    <TwoColumnSplit>
                      <Flex flexDirection="column">
                        <Input
                          placeholder="Add street address"
                          title="Address line 1"
                          block
                        />
                      </Flex>

                      <Flex flexDirection="column">
                        <Input
                          placeholder="Add apt, floor, suite, etc."
                          title="Address line 2 (optional)"
                          block
                        />
                      </Flex>
                    </TwoColumnSplit>
                    <TwoColumnSplit>
                      <Flex flexDirection="column">
                        <Input placeholder="Add city" title="City" block />
                      </Flex>

                      <Flex flexDirection="column">
                        <Input
                          placeholder="Add State, province, or region"
                          title="State, province, or region"
                          block
                        />
                      </Flex>
                    </TwoColumnSplit>
                  </Join>

                  <Spacer mb={3} />

                  <Link to={`/order2/${order.id}/payment`}>
                    <Button size="large" width="100%">
                      Continue
                    </Button>
                  </Link>
                </>
              }
              Sidebar={
                <Summary mediator={this.props.mediator} order={order}>
                  {xs && (
                    <>
                      <Spacer mb={3} />
                      <Link to={`/order2/${order.id}/payment`}>
                        <Button size="large" width="100%">
                          Continue
                        </Button>
                      </Link>
                    </>
                  )}
                </Summary>
              }
            />
          )}
        </Responsive>
      </>
    )
  }
}

export const ShippingFragmentContainer = createFragmentContainer(
  ShippingRoute,
  graphql`
    fragment Shipping_order on Order {
      id
      ...Summary_order
    }
  `
)
