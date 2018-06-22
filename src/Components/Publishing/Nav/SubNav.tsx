import { avantgarde } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import StyledButton from "../../Buttons/Default"
import InvertedButton from "../../Buttons/Inverted"
import { pMedia } from "../../Helpers"
import Icon from "../../Icon"
import { MobileMenu } from "../../Nav/MobileMenu"
import { IconHamburger } from "../Icon/IconHamburger"

interface State {
  mobileNavIsOpen?: boolean
}

export class SubNav extends React.Component<null, State> {
  constructor(props) {
    super(props)
    this.state = {
      mobileNavIsOpen: false,
    }
  }

  toggleMobileNav = () => {
    this.setState({
      mobileNavIsOpen: !this.state.mobileNavIsOpen,
    })
  }

  render() {
    return (
      <SubNavContainer>
        <Link className="mlh-login" href="/log_in">
          <Login>Login</Login>
        </Link>
        <Link className="mlh-signup" href="/sign_up">
          <Signup>Signup</Signup>
        </Link>
        <MobileNavToggle>
          {this.state.mobileNavIsOpen ? (
            <Icon name="close" color="white" onClick={this.toggleMobileNav} />
          ) : (
            <IconHamburger color="white" onClick={this.toggleMobileNav} />
          )}
        </MobileNavToggle>
        {this.state.mobileNavIsOpen && <MobileMenu navHeight="46px" />}
      </SubNavContainer>
    )
  }
}

const Login = InvertedButton.extend`
  ${avantgarde("s11")};
  height: 30px;
  width: 80px;
  border-radius: 2px;
  margin: 8px;
`
const Signup = StyledButton.extend`
  ${avantgarde("s11")};
  height: 30px;
  width: 80px;
  background-color: white;
  border-radius: 2px;
  margin: 8px;
`
const Link = styled.a`
  text-decoration: none;
`
const MobileNavToggle = styled.div`
  display: none;
  margin-right: 5px;
  max-width: 32px;
`
const SubNavContainer = styled.div`
  display: flex;
  height: 100%;
  ${pMedia.sm`
    ${Login}, ${Signup} {
      display: none;
    }
    ${MobileNavToggle} {
      display: flex;
      align-items: center;
    }
  `};
`
