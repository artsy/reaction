import colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import { css } from "styled-components"
import { InputProps } from "./Input"

export const borderedInput = (props: InputProps = {}) => {
  return css`
    padding: 10px;
    box-shadow: none;
    transition: border-color 0.25s;
    margin-right: 10px;
    resize: none;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::placeholder {
      color: ${colors.grayMedium};
      text-overflow: ellipsis;
    }

    ${garamond("s17")};
    ${border(props)};
  `
}

export const border = (props: any = {}) => {
  return css`
    border: 1px solid ${props.hasError ? colors.redMedium : colors.grayRegular};
    transition: border-color 0.25s;

    &:hover,
    &:focus,
    &.focused {
      border-color: ${props.hasError ? colors.redMedium : colors.purpleRegular};
      outline: 0;
    }

    &:disabled {
      border: 2px dotted ${colors.grayRegular};
    }
  `
}
