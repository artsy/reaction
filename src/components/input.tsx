import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import * as fonts from "../assets/fonts"
import { block } from "./helpers"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    error?: boolean
    block?: boolean
}

const Input: React.SFC<InputProps> = props => (
    <input { ...props } />
)

export default styled(Input)`
    padding: 10px;
    border: 2px solid ${props => props.error ? colors.redRegular : colors.grayRegular};
    box-shadow: none;
    font-size: 17px;
    transition: border-color .25s;
    margin-right: 10px;
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
