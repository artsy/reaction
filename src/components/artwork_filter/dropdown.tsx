import * as React from "react"
import * as Relay from "react-relay"

import Icon from '../icon'

import styled from "styled-components"
import colors from "../../assets/colors"
import { primary, secondary } from "../../assets/fonts"

export interface DropdownProps extends RelayProps, React.HTMLProps<Dropdown> {
  aggregation: any
}

export interface DropdownState {
  is_hovered: boolean
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props) {
    super(props)
    this.state = {
      is_hovered: false
    }
  }
  
  toggleHover() {
    this.setState({
      is_hovered: !this.state.is_hovered
    })
  }

  render() {
    const navItems = this.props.aggregation.counts.map((count) =>{
      return (
        <NavItem>
          <span>{count.name}</span>
          <NavItemCount> ({count.count})</NavItemCount>
        </NavItem>
      )
    })

    let buttonColor = "white"
    let buttonTextColor = "black"
    let navStyle = { display: "none" }

    if (this.state.is_hovered) {
      buttonColor = "black"
      buttonTextColor = "white"
      navStyle = { display: "block" }
    }

    return (
      <div 
        className={this.props.className}
        onMouseEnter={() => this.toggleHover()} 
        onMouseLeave={() => this.toggleHover()}
      >
        <Button style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          {this.props.aggregation.slice}
          <Icon 
            name="arrow-down" 
            fontSize="9px" 
            color={buttonTextColor}
          />
        </Button>
        <Nav style={navStyle}>
          {navItems}
        </Nav>
      </div>
    )
  }
}

const Button = styled.div`
  background: white;
  color: black;
  border: 1px solid ${colors.grayRegular};
  display: inline-block;
  line-height: 160%;
  padding: 15px 18px 10px 18px;
  font-size: 13px;
  vertical-align: middle;
  ${primary.style}
`

const Nav = styled.div`
  z-index: 2;
  background: black;
  position: absolute;
  top: 45px;
  left: 1px;
  width: 300px;
  border: 1px solid #333;
`

const NavItem = styled.div`
  ${secondary.style}
  text-align: left;
  color: white;
  display: block;
  border-bottom: 1px solid #333;
  padding: 15px 18px 10px 18px;
  text-transform: capitalize;
  &:hover {
    background: ${colors.grayBold};
  }
`
const NavItemCount = styled.span`
  color: ${colors.graySemibold}
`

const StyledDropdown = styled(Dropdown)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: -1px;
`

export default Relay.createContainer(StyledDropdown, {
  fragments: {
    aggregation: () => Relay.QL`
      fragment on ArtworksAggregationResults {
        slice
        counts {
          name
          id
          count
        }
      }
    `,
  },
})

interface RelayProps {
  aggregation: {
    slice: string | null,
    counts: {
      name: string | null,
      id: string | null,
      count: number | null,
    }
  } | null,
}

