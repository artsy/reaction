import * as React from "react"
import Icon from "./icon"

import styled from "styled-components"
import colors from "../assets/colors"

interface Props extends React.HTMLProps<SaveButton> {
  style?: any
}

interface State {
  saved: any,
  isHovered: boolean,
}

const SIZE = 40

export class SaveButton extends React.Component<Props, null> {
  render() {
    const { style } = this.props

    return (
      <div className={this.props.className} style={style}>
        <Icon name="heart" height={SIZE} color="white"/>
      </div>
    )
  }
}

const StyledSaveButton = styled(SaveButton)`
  width: ${SIZE}px;
  height: ${SIZE}px;
  text-align: center;
  cursor: pointer;
  color: white;
  background-color: ${colors.gray};
  background-color: rgba(0,0,0,0.4);
  border-radius: 50%;
  font-size: 16px;
  line-height: ${SIZE}px;
  &:hover {
    background-color: black;
  }
  &[data-saved='true'] {
    background-color: ${colors.purpleRegular};
    &:hover {
      background-color: ${colors.redBold};
    }
  } 
`

export default StyledSaveButton
