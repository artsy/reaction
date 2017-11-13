import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"

interface Props {
  color?: string
  margin?: string
}

export const IconPlus: React.SFC<Props> = props => {
  const { color, margin } = props

  return (
    <StyledSvg
      className='IconPlus'
      viewBox="0 0 15 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{margin}}
    >
      <g stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
        <g transform="translate(-101.000000, -18.000000)" fill={color ? color : "black"}>
          <g transform="translate(101.000000, 18.000000)">
            <rect x="0" y="7" width="15" height="1" />
            <rect transform="translate(7.500000, 7.500000) rotate(-90.000000) translate(-7.500000, -7.500000) " x="0" y="7" width="15" height="1" />
          </g>
        </g>
      </g>
    </StyledSvg>
  )
}

const StyledSvg = styled.svg`
  width: 15px;
  height: 15px;
  ${pMedia.md`
    width: 13px;
    height: 13px;
  `}
`
