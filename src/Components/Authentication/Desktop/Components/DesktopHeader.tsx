import { garamond } from "Assets/Fonts"
import Icon from "Components/Icon"
import React, { SFC } from "react"
import styled from "styled-components"

export const DesktopHeader: SFC<{ subtitle?: string }> = props => {
  const subtitle = props.subtitle || "The art world online"
  return (
    <Header>
      <Logo name="logotype" />
      <Subtitle>{subtitle}</Subtitle>
    </Header>
  )
}

const Logo = styled(Icon).attrs({
  color: "black",
  fontSize: "34px",
})`
  display: block;
  line-height: 1em;
`

const Subtitle = styled.div`
  ${garamond("s23")};
  font-weight: bold;
  margin: 10px 0 15px 0;
`

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`
