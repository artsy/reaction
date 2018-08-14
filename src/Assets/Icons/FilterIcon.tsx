import { color } from "@artsy/palette"
import React from "react"

interface IconProps {
  fill: string
}

export const FilterIcon = ({ fill }: IconProps) => (
  <svg width="17px" height="14px" viewBox="0 0 17 14" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        transform="translate(-43.000000, -785.000000)"
        fill={fill || color("black100")}
      >
        <g transform="translate(29.000000, 780.000000)">
          <g id="Group-3" transform="translate(14.500000, 5.000000)">
            <g>
              <g>
                <g>
                  <rect x="0" y="10.2" width="10.4" height="1.6" />
                  <rect x="12.8" y="10.2" width="3.2" height="1.6" />
                  <rect x="9.6" y="8.2" width="1.6" height="5.6" />
                  <rect
                    transform="translate(11.200000, 3.000000) scale(-1, 1) translate(-11.200000, -3.000000) "
                    x="6.4"
                    y="2.2"
                    width="9.6"
                    height="1.6"
                  />
                  <rect
                    transform="translate(2.000000, 3.000000) scale(-1, 1) translate(-2.000000, -3.000000) "
                    x="0"
                    y="2.2"
                    width="4"
                    height="1.6"
                  />
                  <rect
                    transform="translate(6.400000, 3.000000) scale(-1, 1) translate(-6.400000, -3.000000) "
                    x="5.6"
                    y="0.2"
                    width="1.6"
                    height="5.6"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
