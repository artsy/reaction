import { color } from "@artsy/palette"
import React from "react"

enum Direction {
  LEFT,
  RIGHT,
}

interface IconProps {
  direction?: Direction
  fill?: string
}

export const ChevronIcon = ({ direction, fill }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width="8px"
    height="8px"
    transform={direction === Direction.RIGHT ? "scale(-1, 1)" : ""}
  >
    <path
      fill={fill ? fill : color("black10")}
      fill-rule="evenodd"
      d="M9.091 10.758l-.788.771-5.832-5.708L8.303.113l.788.771-5.044 4.937 5.044 4.937"
    />
  </svg>
)
