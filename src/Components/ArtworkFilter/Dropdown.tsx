import numeral from "numeral"
import * as React from "react"
import * as Relay from "react-relay"

import Icon from "../Icon"

import styled from "styled-components"
import colors from "../../Assets/Colors"
import { primary, secondary } from "../../Assets/Fonts"
import { labelMap } from "./ParamMap"

import { find } from "lodash"

interface DropdownProps extends RelayProps, React.HTMLProps<Dropdown> {
  aggregation: any
  onSelect?: any
  selected?: any
}

interface DropdownState {
  isHovered: boolean
  selected: any
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props)
    this.state = {
      isHovered: false,
      selected: props.selected || {},
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected })
  }

  toggleHover(value) {
    this.setState({
      isHovered: value,
    })
  }

  onSelect(count, slice) {
    this.setState({
      selected: count.id,
      isHovered: false,
    })
    this.props.onSelect(count, slice)
  }

  getSelectedName(id) {
    const selectedCount = find(this.props.aggregation.counts, count => count.id === id)
    return selectedCount ? selectedCount.name : null
  }

  render() {
    const slice = this.props.aggregation.slice
    const labels = labelMap[this.props.aggregation.slice.toLowerCase()]
    const selectedName = this.getSelectedName(this.state.selected)

    let navItems = this.props.aggregation.counts.map(count => {
      return (
        <NavItem key={count.id} onClick={() => this.onSelect(count, slice)}>
          <span>{count.name}</span>
          <NavItemCount>&nbsp;({numeral(count.count).format("0,0")})</NavItemCount>
        </NavItem>
      )
    })

    navItems.unshift(
      <NavItem key="all" onClick={() => this.onSelect({ value: "*" }, slice)}>
        <span>All {labels.plural}</span>
      </NavItem>
    )

    let buttonColor = "white"
    let buttonTextColor = "black"
    let superLabelColor = "black"
    let navStyle = { display: "none" }

    if (selectedName) {
      buttonTextColor = colors.purpleRegular
    }

    if (this.state.isHovered) {
      buttonColor = "black"
      buttonTextColor = "white"
      superLabelColor = "white"
      navStyle = { display: "block" }
    }

    const labelText = selectedName || labels.label
    const superLabelText = selectedName ? labels.label : null

    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <Button style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          {superLabelText && <SuperLabel style={{ color: superLabelColor }}>{superLabelText}</SuperLabel>}
          {labelText}
          <Icon
            name="arrow-down"
            fontSize="9px"
            color={buttonTextColor}
            style={{ position: "absolute", right: 15, lineHeight: "inherit" }}
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
  padding: 15px 35px 15px 18px;
  font-size: 13px;
  vertical-align: middle;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const SuperLabel = styled.div`
  position: absolute
  font-size: 9px
  margin-top: -15px;
  color: black
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
    slice: string | null
    counts: {
      name: string | null
      id: string | null
      count: number | null
    }
  } | null
}
