import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import * as fonts from "../assets/fonts"
import { block } from "./helpers"
import { borderedInput } from "./mixins"

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    error?: boolean
    block?: boolean
}

const TextArea: React.SFC<TextAreaProps> = props => (
    <textarea { ...props } />
)

export default styled(TextArea)`
    ${borderedInput}
    ${block(24)}
`
