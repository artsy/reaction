import { css } from "styled-components"

export const block = (margin: number = 0) => {
    return props => {
        if (props.block)
            return css`
                display: block;
                width: calc(100% - ${margin}px);
                margin: 10px auto;
            `
        }
}