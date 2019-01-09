import React from "react"

interface IconProps {
  fill?: string
  selected?: boolean
}

export const Download: React.SFC<IconProps> = ({ fill = "#000" }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Download</title>
      <g id="icon_download" fill="none" fillRule="evenodd">
        <g id="Group-10">
          <rect id="Rectangle" width="18" height="18" />
          <g id="Group" transform="translate(3 2)" fill={fill}>
            <polygon
              id="Path"
              fillRule="nonzero"
              transform="rotate(135 6.246 5.246)"
              points="9.49106749 2 9.49106749 7.12 8.5993821 7.12 8.5993821 3.52449438 3.63280899 8.49106749 3 7.85825851 7.96657311 2.89168539 4.37106749 2.89168539 4.37106749 2"
            />
            <polygon
              id="Rectangle"
              points="0 8 1 8 1 12 11.0160522 12 11.0160522 8 12.0201416 8 12.0201416 13 0 13"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

Download.displayName = "Download"
