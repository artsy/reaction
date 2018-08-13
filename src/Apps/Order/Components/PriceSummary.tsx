import { Serif } from "@artsy/palette"
import React from "react"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { Spacer } from "Styleguide/Elements/Spacer"
import { StackableResponsiveBorderBox } from "Styleguide/Elements/StackableResponsiveBorderBox"

interface PriceSummaryProps extends FlexProps {
  price: string
  shipping: string
  tax: string
  total: string
}

export const PriceSummary: React.SFC<PriceSummaryProps> = ({
  price,
  shipping,
  tax,
  total,
  ...others
}) => {
  return (
    <StackableResponsiveBorderBox flexDirection="column" {...others}>
      <Entry label="Price" value={price} />
      <Entry label="Shipping" value={shipping} />
      <Entry label="Tax" value={tax} />
      <Spacer mb={2} />
      <Entry label="Total" value={total} final />
    </StackableResponsiveBorderBox>
  )
}

const Entry = ({
  label,
  value,
  final,
}: {
  label: React.ReactNode
  value: React.ReactNode
  final?: boolean
}) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Serif size="2" color="black60">
        {label}
      </Serif>
    </div>
    <div>
      <Serif
        size="2"
        color={final ? "black100" : "black60"}
        weight={final ? "semibold" : "regular"}
      >
        {value}
      </Serif>
    </div>
  </Flex>
)
