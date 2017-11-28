import React from "react"
import styled, { StyledFunction } from "styled-components"
import StyledButton from "../../Buttons/Default"
import InvertedButton from "../../Buttons/Inverted"
import Icon from "../../Icon"
import { Fonts } from "../Fonts"
import { PartnerInline } from "../Partner/PartnerInline"

interface Props {
  article: any
  transparent?: boolean
}

interface DivProps {
  transparent: boolean
}

export const Nav: React.SFC<Props> = props => {
  const {
    article,
    transparent
  } = props
  return (
    <NavContainer transparent={transparent}>
      <Logos>
        {article.sponsored ?
          <PartnerInline
            url="/"
            logo={article.sponsor.white_logo}
            color="white"
          />
          :
          <a href='/'>
            <Icon
              name="logo"
              color="white"
              fontSize="32px"
            />
          </a>
        }
      </Logos>
      <Title>Artsy Editorial</Title>
      <div>
        <Login>Login</Login>
        <Signup>Signup</Signup>
      </div>
    </NavContainer>
  )
}

Nav.defaultProps = {
  transparent: false
}

const Div: StyledFunction<DivProps & React.HTMLProps<HTMLDivElement>> = styled.div
const NavContainer = Div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  width: 100%;
  background-color: ${props => props.transparent ? "transparent" : "black"};
  color: white;
`
const Title = styled.div`
  ${Fonts.garamond("s17")}
`
const Login = InvertedButton.extend`
  ${Fonts.avantgarde("s11")}
  height: 30px;
  width: 80px;
  border-radius: 2px;
`
const Signup = StyledButton.extend`
  ${Fonts.avantgarde("s11")}
  height: 30px;
  width: 80px;
  background-color: white;
  border-radius: 2px;  
`
const Logos = styled.div`
  padding: 10px;
  ${Icon} {
    margin: 0;
  }
`
