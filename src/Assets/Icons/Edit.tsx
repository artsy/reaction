import React from "react"

interface IconProps {
  fill?: string
}

export const Edit: React.SFC<IconProps> = ({ fill = "#000" }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Edit</title>
      <g id="icon_edit" fill="none" fillRule="evenodd">
        <g id="Group-10">
          <rect id="Rectangle" width="18" height="18" />
          <g id="Group" transform="translate(3 3)" fill={fill}>
            <path
              d="M6.00138812,-0.810967477 L9.18573599,-0.781194725 L9.11201839,9.43342759 L7.69102432,11.0680943 L5.92122055,9.52962732 L6.00138812,-0.810967477 Z M6.90081948,0.0246764113 L6.83778432,9.00112844 L7.60766469,9.67037524 L8.23579934,8.91714921 L8.29246869,0.0357687036 L6.90081948,0.0246764113 Z"
              id="Combined-Shape"
              transform="rotate(49 7.553 5.129)"
            />
            <polygon
              id="Combined-Shape"
              points="7.10542736e-15 -1.50990331e-14 6.9921875 -1.50990331e-14 6.9921875 1.00854492 1.00842285 1.00854492 1.00842285 11 11 11 11 7 12 7 12 12 7.10542736e-15 12"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

Edit.displayName = "Edit"
