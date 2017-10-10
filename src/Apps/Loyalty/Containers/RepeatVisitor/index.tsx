import * as React from "react"
import styled from "styled-components"

import Button from "../../../../components/buttons/inverted"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import Text from "../../../../components/text"
import Title from "../../../../components/title"

const Container = styled.div`
  text-align: center;
`

const Section = styled.div`
  marginTop: 40px;
`

const ButtonWrapper = styled.div`
  marginTop: 40px;
`

export default props =>
  <Container>
    <Nav>
      <NavItem href="/">Back To Artsy</NavItem>
    </Nav>

    <Title>Your purchases are being reviewed</Title>

    <Section>
      <Text textSize="large" align="center">
        We will be in touch once we confirm your<br />
        purchases with the galleries.
      </Text>
    </Section>

    <ButtonWrapper>
      <Button href="/">Back to Artsy</Button>
    </ButtonWrapper>
  </Container>
