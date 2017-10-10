import * as React from "react"
import styled from "styled-components"

import colors from "../../../../assets/colors"

import Button from "../../../../components/buttons/inverted"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import Text from "../../../../components/text"
import TextLink from "../../../../components/text_link"
import Title from "../../../../components/title"

const Container = styled.div`
  text-align: center;
`

const Section = styled.div`
  marginTop: 40px;
`

const ButtonWrapper = styled.div`
  marginTop: 100px;
`

export default props =>
  <Container>
    <Nav>
      <NavItem href="/">Back To Artsy</NavItem>
    </Nav>

    <Section>
      <Text textStyle="primary" textSize="small" align="center" color={colors.graySemibold}>EARLY ACCESS</Text>
    </Section>

    <Title>Artsy Collector Loyalty Program</Title>

    <Section>
      <Text textSize="large" align="center">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch: &nbsp;
        <TextLink href="mailto:loyalty@artsy.net" underline>loyalty@artsy.net</TextLink>
      </Text>
    </Section>

    <ButtonWrapper>
      <Button href="/">Back to Artsy</Button>
    </ButtonWrapper>
  </Container>
