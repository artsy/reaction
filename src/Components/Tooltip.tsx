import styled, { StyledFunction } from "styled-components"
import colors from "../Assets/Colors"

interface Props extends React.HTMLProps<HTMLSpanElement> {
  message: string
}

const Span: StyledFunction<Props & React.HTMLProps<HTMLSpanElement>> = styled.span

export const Tooltip = Span`
  display: inline-block;
  position: relative;
  cursor: help;
  margin: 0 0.5em;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;

  &:before {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    content: "?";
    z-index: 2;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    line-height: 15px;
    text-align: center;
    vertical-align: middle;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: bold;
    color: white;
    background-color: ${colors.grayDark};
  }
  &:hover {
    &:before {
      z-index: 4;
    }
    &:after {
      opacity: 1;
      z-index: 3;
      transition: opacity 0.125s;
      transition-delay: 0.0625s;
      visibility: visible;
    }
  }
  &:after {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    text-align: left;
    z-index: 1;
    margin: -10px 0 0 -10px;
    width: 300px;
    color: ${colors.grayMedium};
    background-color: white;
    padding: 30px;
    opacity: 0;
    line-height: 1.3;
    transform: translateZ(0);
    border: 1px solid ${colors.grayDark};
    content: ${props => `"` + props.message + `"`};
  }
`
