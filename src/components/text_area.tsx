import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import * as fonts from "../assets/fonts"
import { block } from "./helpers"

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    error?: boolean
    block?: boolean
}

const TextArea: React.SFC<TextAreaProps> = props => (
    <textarea { ...props } />
)

export default styled(TextArea)`
    padding: 10px;
    border: 2px solid ${props => props.error ? colors.redRegular : colors.grayRegular};
    box-shadow: none;
    font-size: 17px;
    transition: border-color .25s;
    margin-right: 10px;
    resize: none;
    ${fonts.secondary.style}

    &:focus {
        border-color: ${props => props.error ? colors.redRegular : colors.purpleRegular};
        outline: 0;
    }

    &:disabled {
        border: 2px dotted ${colors.grayRegular};
    }

    ${block(24)}
`
