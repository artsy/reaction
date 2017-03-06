import { css } from "styled-components"
import colors from "../assets/colors"
import * as fonts from "../assets/fonts"
import { InputProps } from "./input"

export const borderedInput = (props: InputProps) => {
  return css`
    padding: 10px;
    border: 2px solid ${props.error ? colors.redRegular : colors.grayRegular};
    box-shadow: none;
    font-size: 17px;
    transition: border-color .25s;
    margin-right: 10px;
    resize: none;

    :placeholder {
      
    }
    ${fonts.secondary.style}

    &:focus {
      border-color: ${props.error ? colors.redRegular : colors.purpleRegular};
      outline: 0;
    }

    &:disabled {
      border: 2px dotted ${colors.grayRegular};
    }
  `
}
