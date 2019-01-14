import React from "react"
import styled from "styled-components"
import { block } from "./Helpers"
import { borderedInput } from "./Mixins"

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  error?: boolean
  block?: boolean
}

const TextArea: React.SFC<TextAreaProps> = props => {
  const newProps = { ...props }
  delete newProps.block
  return <textarea {...newProps} />
}

export default styled(TextArea)`
  /* stylelint-disable-next-line */
  ${borderedInput} ${block(24)};
`
