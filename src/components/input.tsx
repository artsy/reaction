import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import * as fonts from "../assets/fonts"
import { block } from "./helpers"
import { borderedInput } from "./mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean
  block?: boolean
  rightView?: JSX.Element
}

const StyledInput = styled.input`
  ${borderedInput}
  ${block(24)}
`

const BorderlessInput = styled.input`
  border-color: transparent !important;
  ${fonts.secondary.style}
  font-size: 17px;
  outline: none;
  flex: 1;
`

const StyledDiv = styled.div`
  ${borderedInput}
  margin-right: 0;
  display: flex;

  & input:focus + :after {
    display: absolute;
    background: red;
  }
`

const Input: React.SFC<InputProps> = ({ block, ...props }) => {
  if (props.rightView) {
    const newProps: any = {...props}
    delete newProps.className

    return (
      <StyledDiv {...{tabindex: 0}}>
        <BorderlessInput {...newProps} />
        {props.rightView}
      </StyledDiv>
    )
  }

  return (
    <StyledInput {...props} />
  )
}

export default Input
