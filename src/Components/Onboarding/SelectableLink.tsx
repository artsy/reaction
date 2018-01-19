import React from "react"
import styled, { StyledFunction } from "styled-components"

import * as fonts from "../../Assets/Fonts"
import { media } from "../Helpers"
import Icon from "../Icon"

interface SelectableLinkProps {
  href?: string
  text?: string
  onSelect: (selected: boolean) => void
}

interface LinkState {
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
  ${media.sm`
    padding: 15px 0 15px 15px;
  `};
`

class SelectableLink extends React.Component<SelectableLinkProps, LinkState> {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
    }
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect() {
    const state = !this.state.selected
    this.setState({ selected: state })
    if (this.props.onSelect) {
      this.props.onSelect(state)
    }
  }

  render() {
    return (
      <div>
        <Link href={this.props.href} onClick={() => this.onSelect()}>
          {this.props.text}

          <IconContainer isSelected={this.state.selected}>
            <Icon
              name="follow-circle.is-following"
              color="white"
              fontSize="39px"
              style={{ alignSelf: "center" }}
            />
          </IconContainer>
        </Link>
      </div>
    )
  }
}

export default SelectableLink
