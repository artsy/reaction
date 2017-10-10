import * as React from 'react'
import styled from 'styled-components'

import colors from "../../assets/colors"
import * as fonts from '../../assets/fonts'

import Icon from "../icon"
import Input from '../input'

interface SelectableItemProps {
  placeholder?: string,
  items: Array<{
    name: string,
    image: {
      cropped: {
        url: string
      }
    }
  }>
}

const Link = styled.a`
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

export default class SelectableItemContainer extends React.Component<SelectableItemProps, null> {
  render() {
    const items = this.props.items.map(item =>
      <Link href="#">
        <Col>
          <Avatar src={item.image.cropped.url} width={50} height={50} />
        </Col>
        <FullWidthCol>
          {item.name}
        </FullWidthCol>
        <Col>
          <Icon name="follow-circle" color="black" fontSize="39px" />
        </Col>
      </Link>
    )

    return (
      <OnboardingSearchBox>
        <div style={{ marginBottom: "35px" }}>
          <Input placeholder={this.props.placeholder} leftView={<Icon name="search" color={colors.graySemibold} />} block />
        </div>

        {items}
      </OnboardingSearchBox>
    )
  }
}