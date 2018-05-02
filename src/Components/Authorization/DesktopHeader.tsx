import React, { SFC } from "react"
import styled from "styled-components"
import Text from "../Text"
import Icon from "../Icon"
import { DesktopModalProps } from "./DesktopModal"

export const DesktopHeader: SFC<DesktopModalProps> = props => {
  const subtitle = props.subtitle || "The Art World Online"
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
`

const Subtitle = styled(Text).attrs({
  textSize: "medium",
  align: "center",
})`
  margin: 10px 0 15px 0;
`

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin: 20px 0 0;
  line-height: 1em;
`
