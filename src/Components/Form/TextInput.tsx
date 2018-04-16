import React from "react"
import styled, { StyledFunction } from "styled-components"
import colors from "../../Assets/Colors"

type Styled<P, T> = StyledFunction<P & React.HTMLProps<T>>
type StyledInput<P> = Styled<P, HTMLInputElement>

const breakpoints = {
  medium: "768px"
}

const formControlStyle = `
  width: 100%;
  display: block;
  height: 36px;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.428571429;
  color: black;
  background-color: white;
  background-image: none;
  border: solid 2px ${colors.grayRegular};
  border-radius: 0px;
  outline: 0;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &::placeholder {
    color: ${colors.grayMedium};
  }

  &:focus {
    border-color: ${colors.purpleRegular};
  }
`

interface Props {
  isError?: boolean
  flexBasis?: string
}

const input: StyledInput<Props> = styled.input

export const TextInput = input.attrs({ type: "text" })`
  ${formControlStyle}
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    flex-basis: ${props => props.flexBasis || "100%"};
  }
  ${props =>
    props.isError &&
    `
      border-color: ${colors.redBold};
      &:focus {
        border-color: ${colors.redBold};
      }
    `};
`
TextInput.displayName = "TextInput"

export default TextInput
