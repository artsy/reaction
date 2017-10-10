import * as React from "react"
import styled, { StyledFunction } from "styled-components"

import { fadeIn, fadeOut } from "../../Assets/Animations"
import colors from "../../Assets/Colors"
import * as fonts from "../../Assets/Fonts"

import Icon from "../Icon"
import Input from "../Input"

interface SelectableItemProps {
  placeholder?: string
  items: Array<{
    name: string
    image: {
      cropped: {
        url: string
      }
    }
  }>
}

interface ClickableLinkState {
  fadeIn?: boolean
  fadeOut?: boolean
}

const anchor: StyledFunction<ClickableLinkState & React.HTMLProps<HTMLInputElement>> = styled.a
const Link = anchor`
  display: flex;
  font-size: 14px;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-family: ${fonts.primary.fontFamily};
  border-top: 1px solid #e5e5e5;
  &:hover {
    background-color: #f8f8f8;
  }
  ${props => (props.fadeIn ? fadeIn : null)}
  ${props => (props.fadeOut ? fadeOut : null)}
`

const Avatar = styled.img`
  padding: 10px 15px 10px 10px;
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid #e5e5e5;
`

class ItemLink extends React.Component<React.HTMLProps<HTMLAnchorElement>, ClickableLinkState> {
  constructor(props) {
    super(props)
    this.state = {
      fadeIn: false,
      fadeOut: false,
    }
  }

  onClick() {
    this.setState({ fadeOut: true })
  }

  render() {
    return (
      <Link onClick={this.onClick.bind(this)} fadeIn={this.state.fadeIn} fadeOut={this.state.fadeOut}>
        {this.props.children}
      </Link>
    )
  }
}

export default class SelectableItemContainer extends React.Component<SelectableItemProps, null> {
  render() {
    const items = this.props.items.map(item => (
      <ItemLink href="#">
        <Col>
          <Avatar src={item.image.cropped.url} width={50} height={50} />
        </Col>
        <FullWidthCol>{item.name}</FullWidthCol>
        <Col>
          <Icon name="follow-circle" color="black" fontSize="39px" />
        </Col>
      </ItemLink>
    ))

    return (
      <OnboardingSearchBox>
        <div style={{ marginBottom: "35px" }}>
          <Input
            placeholder={this.props.placeholder}
            leftView={<Icon name="search" color={colors.graySemibold} />}
            block
          />
        </div>

        {items}
      </OnboardingSearchBox>
    )
  }
}
