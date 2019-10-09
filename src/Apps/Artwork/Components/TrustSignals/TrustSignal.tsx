import { Flex, Sans } from "@artsy/palette"
import React, { FC } from "react"

export interface TrustSignalProps {
  Icon: JSX.Element
  label: string
  description: string | JSX.Element
}

export const TrustSignal: FC<TrustSignalProps> = ({
  Icon,
  label,
  description,
}) => (
  <Flex>
    {Icon}
    <Flex flexDirection="column" ml={1}>
      <Sans size="2" weight="medium" color="black100">
        {label}
      </Sans>
      <Sans size="2" color="black60">
        {description}
      </Sans>
    </Flex>
  </Flex>
)
