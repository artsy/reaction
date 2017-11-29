import React from "react"
import styled from "styled-components"
import StyledButton from "../../Buttons/Default"
import InvertedButton from "../../Buttons/Inverted"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { IconHamburger } from "../Icon/IconHamburger"

export const AccountButtons: React.SFC<null> = props => {
  return (
    <AccountButtonsContainer>
      <Link className="mlh-login" href="/log_in">
        <Login>
          Login
        </Login>
      </Link>
      <Link className="mlh-signup" href="/sign_up">
        <Signup>
          Signup
        </Signup>
      </Link>
      {/* TODO: Implement a dropdown nav once design is ready */}
      <MobileNav>
        <IconHamburger color="white"/>
      </MobileNav>
    </AccountButtonsContainer>
  )
}

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
const Link = styled.a`
  text-decoration: none;
`
const MobileNav = styled.div`
  margin-right: 5px;
  display: none;
`
const AccountButtonsContainer = styled.div`
  ${pMedia.sm`
    ${Login}, ${Signup} {
      display: none;
    }
    ${MobileNav} {
      display: flex;
    }
  `}
`
