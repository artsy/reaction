import React, { HTMLProps } from "react"

interface CheckmarkProps extends HTMLProps<SVGElement> {
  stroke?: string
}

export class Checkmark extends React.Component<CheckmarkProps> {
  render() {
    const { stroke, ...remainderProps } = this.props

    return (
      <svg width={14} height={11} viewBox="0 0 14 11" {...remainderProps}>
        <path
          fill="none"
          fillRule="evenodd"
          stroke={stroke || "#FFF"}
          strokeWidth={2}
          d="M1 4.743L5.168 9 13 1"
        />
      </svg>
    )
  }
}
