import * as React from "react"
import styled from "styled-components"

import Button from "../../../../components/buttons/inverted"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import Text from "../../../../components/text"
import TextLink from "../../../../components/text_link"
import Title from "../../../../components/title"

const Container = styled.div`
  text-align: center;
`

const TitleSection = styled.div`
  marginTop: 50px;
`

const TextSection = styled.div`
  marginTop: 20px;
`

const ButtonWrapper = styled.div`
  marginTop: 40px;
`

interface Props {
  userName: string
}

const ThreeWThankYou: React.SFC<Props> = props =>
  <Container>
    <Nav>
      <NavItem href="/">Back To Artsy</NavItem>
    </Nav>

    <TitleSection>
      <Title>
        Thank you, {props.userName}
      </Title>
    </TitleSection>

    <TextSection>
      <Text textSize="large" align="center">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch: &nbsp;
        <TextLink href="mailto:loyalty@artsy.net" underline>loyalty@artsy.net</TextLink>
      </Text>
    </TextSection>

    <ButtonWrapper>
      <Button href="/">Back to Artsy</Button>
    </ButtonWrapper>
  </Container>

export default ThreeWThankYou
