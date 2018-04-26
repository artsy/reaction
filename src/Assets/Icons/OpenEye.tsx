import React from "react"

export const OpenEye = props => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
    >
      <path
        fill="#c2c2c2"
        d="M6,2A6.75,6.75,0,0,0,0,6a6.75,6.75,0,0,0,6,4,6.75,6.75,0,0,0,6-4A6.75,6.75,0,0,0,6,2ZM6,8.5A2.5,2.5,0,1,1,8.5,6,2.5,2.5,0,0,1,6,8.5Z"
      />
      <path
        fill="#c2c2c2"
        d="M6,4.5A1.5,1.5,0,1,0,7.5,6,1.5,1.5,0,0,0,6,4.5Z"
      />
    </svg>
  )
}
