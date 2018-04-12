import { css } from "styled-components"
import colors from "../Assets/Colors"
import * as fonts from "../Assets/Fonts"
import { InputProps } from "./Input"

export const borderedInput = (props: InputProps = {}) => {
  return css`
    padding: 10px;
    box-shadow: none;
    font-size: 17px;
    transition: border-color 0.25s;
    margin-right: 10px;
    resize: none;

    ${fonts.secondary.style} ${border(props)};
  `
}

export const border = (props: InputProps = {}) => {
  return css`
    border: 1px solid ${props.error ? colors.redRegular : colors.grayRegular};
    transition: border-color 0.25s;

    &:focus,
    &.focused {
      border-color: ${props.error ? colors.redRegular : colors.purpleRegular};
      outline: 0;
    }

    &:disabled {
      border: 2px dotted ${colors.grayRegular};
    }
  `
}
