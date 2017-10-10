import * as React from "react"
import styled from "styled-components"

import Button from "../../buttons/ghost"
import Title from "../../title"

interface Props {
  title: string
  subtitle: string
  onNextButtonPressed?: () => void
}

const Container = styled.div`
  max-width: 930px;
  margin-left: auto;
  margin-right: auto;
`

const MainTitle = styled(Title)`
  text-align: center;
`
const Subtitle = styled(Title)`
  color: #999;
  margin-bottom: 100px;
  text-align: center;
`

const ButtonContainer = styled(Button)`
  margin: 0 auto 50px;
  display: block;
  width: 250px;
`

export class Layout extends React.Component<Props, null> {
  render() {
    const disabled = !this.props.onNextButtonPressed
    return (
      <Container>
        <MainTitle titleSize="xlarge">{this.props.title} </MainTitle>
        <Subtitle titleSize="xlarge">{this.props.subtitle}</Subtitle>
        <div>{this.props.children}</div>
        <ButtonContainer disabled={disabled} onClick={this.props.onNextButtonPressed}>
          Next
        </ButtonContainer>
      </Container>
    )
  }
}
