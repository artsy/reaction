import * as React from "react"
import styled from "styled-components"

import * as fonts from "../../assets/fonts"
import Icon from "../icon"

interface SelectableLinkProps {
  href?: string
  text?: string
  onSelect: (selected: boolean) => void
}

interface LinkState {
  selected: boolean
}

const IconContainer = styled.div`
width: 15px;
height: 15px;
background-color: black;
display: none;
border-radius: 50%;
float: right;
margin-right: 15px;
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
&:hover .collector-intent-checked {
  display: inline;
}
& .collector-intent-checked.is-selected {
  display: inline;
}
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

          <IconContainer className={`collector-intent-checked ${this.state.selected ? "is-selected" : ""}`}>
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
      </div>
    )
  }
}

export default SelectableLink
