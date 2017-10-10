import * as React from "react"
import styled from "styled-components"
import { block } from "./helpers"
import { borderedInput } from "./mixins"

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
  ${borderedInput}
  ${block(24)}
`
