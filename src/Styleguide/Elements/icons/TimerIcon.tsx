import { color } from "@artsy/palette"
import React from "react"

export const TimerIcon = ({
  fill = "black100",
  ...others
}: React.SVGProps<SVGSVGElement> & {
  fill: Parameters<typeof color>[0]
}) => (
  <svg
    className="timer"
    viewBox="0 0 10 12"
    height="12"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
    {...others}
  >
    <g fill={color(fill)} fillRule="nonzero">
      <path d="M5.043 11.891C2.41 11.895.234 9.814.087 7.153-.06 4.49 1.873 2.177 4.489 1.883V1.13h-.524V.109h2.058v1.02H5.5v.744c1.082.1 2.1.558 2.9 1.303l.847-.858.713.723-.894.901a5.069 5.069 0 0 1 .39 5.221 4.946 4.946 0 0 1-4.412 2.728zm0-9.019c-2.18.002-3.947 1.791-3.95 3.999a4 4 0 0 0 2.437 3.696A3.914 3.914 0 0 0 7.835 9.7a4.037 4.037 0 0 0 .857-4.358 3.95 3.95 0 0 0-3.65-2.47z" />
      <path d="M4.489 3.83h1.009v3.701H4.489z" />
    </g>
  </svg>
)
