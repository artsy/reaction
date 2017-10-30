import React from "react"
import styled, { StyledFunction } from "styled-components"

import * as fonts from "../../Assets/Fonts"
import Icon from "../Icon"

interface SelectableToggleProps {
  href?: string
  text?: string
  onSelect: (selected: boolean) => void
  selected: boolean
}

interface IconContainerProps extends React.HTMLProps<HTMLIFrameElement> {
  isSelected: boolean
}

const iconContainer: StyledFunction<IconContainerProps> = styled.div

const IconContainer = iconContainer`
  width: 18px;
  height: 18px;
  background-color: black;
  border-radius: 50%;
  float: right;
  margin-right: 15px;
  display: ${props => (props.isSelected ? "inline-flex;" : "none;")}
  justify-content: ${props => (props.isSelected ? "center;" : "none;")}
`

const Link = styled.a`
  display: block;
  font-size: 14px;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-family: ${fonts.primary.fontFamily};
  padding: 30px 0 30px 15px;
  border-top: 1px solid #e5e5e5;
  &:hover {
    background-color: #f8f8f8;
  }
  &:hover ${IconContainer} {
    display: inline-flex;
    justify-content: center;
  }
`

class SelectableToggle extends React.Component<SelectableToggleProps, null> {
  constructor(props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect() {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.selected)
    }
  }

  render() {
    return (
      <div>
        <Link href={this.props.href} onClick={() => this.onSelect()}>
          {this.props.text}

          <IconContainer isSelected={this.props.selected}>
            <Icon name="follow-circle.is-following" color="white" fontSize="39px" style={{ alignSelf: "center" }} />
          </IconContainer>
        </Link>
      </div>
    )
  }
}

export default SelectableToggle
