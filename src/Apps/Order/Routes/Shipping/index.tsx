import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

const CONTENT_SPAN = 7
const SIDEBAR_SPAN = 4
const ROW_SPACE = 3
const columnRatioWidth = (spans, size) => Math.round((spans / size) * 100) + "%"

const TwoColumnSplit = ({ children, ...props }) => {
  let [firstColumn, secondColumn] = React.Children.toArray(children)

  return (
    <Responsive>
      {({ xs }) => (
        <Flex flexDirection={xs ? "column" : "row"} {...props}>
          <Box width={xs ? "100%" : columnRatioWidth(4, CONTENT_SPAN)}>
            {firstColumn}
          </Box>
          <Spacer mr={xs ? null : 2} mb={xs ? ROW_SPACE : null} />
          <Box width={xs ? "100%" : columnRatioWidth(3, CONTENT_SPAN)}>
            {secondColumn}
          </Box>
        </Flex>
      )}
    </Responsive>
  )
}

export interface ShippingProps {
  order: Shipping_order
}

export class ShippingRoute extends Component<ShippingProps> {
  render() {
    // const { order } = this.props
    return (
      <TwoColumnLayout
        contentSpan={CONTENT_SPAN}
        Content={
          <React.Fragment>
            <Placeholder height="180px" name="Radio Group" mb={ROW_SPACE} />
            <Placeholder height="68px" name="Full Name" mb={ROW_SPACE} />
            <TwoColumnSplit mb={ROW_SPACE}>
              <Placeholder height="68px" name="Country" />
              <Placeholder height="68px" name="Postal Code" />
            </TwoColumnSplit>
            <TwoColumnSplit mb={ROW_SPACE}>
              <Placeholder height="68px" name="Address Line 1" />
              <Placeholder height="68px" name="Address Line 2 (optional)" />
            </TwoColumnSplit>
            <TwoColumnSplit mb={ROW_SPACE}>
              <Placeholder height="68px" name="City" />
              <Placeholder height="68px" name="State, province, or region" />
            </TwoColumnSplit>
          </React.Fragment>
        }
        Sidebar={<Placeholder height="390px" name="Sidebar" />}
        sidebarSpan={SIDEBAR_SPAN}
      />
    )
  }
}

export const ShippingFragmentContainer = createFragmentContainer(
  ShippingRoute,
  graphql`
    fragment Shipping_order on Order {
      id
    }
  `
)
