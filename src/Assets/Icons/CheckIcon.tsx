import React from "react"

interface IconProps {
  fill: string
}

export const CheckIcon = ({ fill }: IconProps) => (
  <svg width="10px" height="8px" viewBox="0 0 10 8" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-416.000000, -960.000000)" fill="#000000">
        <g transform="translate(416.000000, 918.000000)">
          <polygon
            fill={fill}
            points="7.97385698 42 9.14742868 42.8908963 3.39210448 50.0024371 0 46.7045578 1.06103742 45.6729936 3.26349389 47.8142707"
          />
        </g>
      </g>
    </g>
  </svg>
)
