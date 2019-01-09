import { color } from "@artsy/palette"
import React from "react"

interface IconProps {
  fill?: string
  selected?: boolean
}

export const Heart: React.SFC<IconProps> = ({
  fill = "#000",
  selected = false,
}) => {
  if (selected) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Save</title>
        <g id="Save-/-Select" fill="none" fillRule="evenodd">
          <g
            id="Heart_selected"
            transform="translate(1 1)"
            fill={color("purple100")}
            fillRule="nonzero"
          >
            <path
              d="M11,2 C9.93881482,1.99916554 8.92078842,2.42004572 8.17,3.17 L8,3.34 L7.83,3.17 C6.26703416,1.60703416 3.73296584,1.60703416 2.17,3.17 C0.607034158,4.73296584 0.607034158,7.26703416 2.17,8.83 L7.65,14.3 C7.74073333,14.3966772 7.86741409,14.4515186 8,14.4515186 C8.13258591,14.4515186 8.25926667,14.3966772 8.35,14.3 L13.83,8.83 C14.9753208,7.6859537 15.3181603,5.96436955 14.6984897,4.46883954 C14.0788192,2.97330954 12.6188267,1.99872604 11,2 Z"
              id="Shape"
            />
          </g>
        </g>
      </svg>
    )
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill={fill}
      >
        <path d="M12 3a4 4 0 0 0-2.83 1.17L9 4.34l-.17-.17a4.002 4.002 0 0 0-5.66 5.66l5.48 5.47a.48.48 0 0 0 .7 0l5.48-5.47A4 4 0 0 0 12 3zm2.12 6.12L9 14.24 3.88 9.12a3 3 0 1 1 4.24-4.24l.53.52.35.36.35-.36.53-.52a3 3 0 0 1 4.24 4.24z" />
      </svg>
    )
  }
}

Heart.displayName = "Heart"
