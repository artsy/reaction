import { Serif } from "@artsy/palette"
import Icon from "Components/Icon"
import React, { SFC } from "react"
import styled from "styled-components"
import { media } from "../Helpers"

export const ModalHeader: SFC<{
  title?: string
  hasLogo?: boolean
}> = props => {
  const { hasLogo, title } = props

  return (
    <Header>
      {hasLogo && <Logo name="logotype" />}
      {title && (
        <Serif size="5" weight="semibold">
          {title}
        </Serif>
      )}
    </Header>
  )
}

const Logo = styled(Icon).attrs({
  color: "black",
  fontSize: "34px",
})`
  display: block;
  line-height: 1em;
  margin-bottom: 10px;
  ${media.sm`
    display: none;
  `};
`

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`
