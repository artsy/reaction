import { css } from "styled-components"
import colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import { InputProps } from "./Input"

export const borderedInput = (props: InputProps = {}) => {
  return css`
    padding: 10px;
    box-shadow: none;
    transition: border-color 0.25s;
    margin-right: 10px;
    resize: none;

    &::placeholder {
      color: ${colors.grayMedium};
    }

    ${garamond("s17")};
    ${border(props)};
  `
}

export const border = (props: InputProps = {}) => {
  return css`
    border: 1px solid ${!!props.error ? colors.redRegular : colors.grayRegular};
    transition: border-color 0.25s;

    &:hover,
    &:focus,
    &.focused {
      border-color: ${!!props.error ? colors.redRegular : colors.purpleRegular};
      outline: 0;
    }

    &:disabled {
      border: 2px dotted ${colors.grayRegular};
    }
  `
}
