import Icon from "Components/Icon"
import React from "react"
import { ColorProps, SizeProps } from "styled-system"

interface ArrowProps extends ColorProps, SizeProps {
  direction: "left" | "right" | "up" | "down"
  fontSize?: string
}

export const Arrow: React.SFC<ArrowProps> = ({
  direction,
  fontSize,
  ...rest
}) => {
  return (
    <Icon
      name={`chevron-${direction}` as any}
      fontSize={fontSize}
      {...rest as any}
    />
  )
}

// TODO: Update Icon color and fontSize props to support styled-system
Arrow.defaultProps = {
  color: "black100",
  fontSize: "9px",
}
