import * as React from "react"
import styled from "styled-components"
import { block } from "./helpers"
import { borderedInput } from "./mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean
  block?: boolean
}

const Input: React.SFC<InputProps> = ({ block, ...props }) => (
  <input {...props} />
)

export default styled(Input)`
  ${borderedInput}
  ${block(24)}
`
