import React from "react"
import styled from "styled-components"

import Colors from "../../../Assets/Colors"
import Button from "../../Buttons/Ghost"
import { media } from "../../Helpers"
import StyledTitle from "../../Title"

interface Props {
  title: string
  subtitle: string
  onNextButtonPressed?: () => void
  isLastStep?: boolean | null
}

const Container = styled.div`
  max-width: 930px;
  margin-left: auto;
  margin-right: auto;
  ${media.sm`
    margin: 20px;
  `};
`

const MainTitle = styled(StyledTitle)`
  text-align: center;
  line-height: normal;
  ${media.sm`
    text-align: left;
  `};
`
const Subtitle = styled(StyledTitle)`
  color: ${Colors.grayDark};
  margin-bottom: 100px;
  text-align: center;
  line-height: normal;
  ${media.sm`
    text-align: left;
    margin-bottom: 15px;
    font-size: 20px
  `};
`

const ButtonContainer = styled(Button)`
  margin: 0 auto 50px;
  display: block;
  width: 250px;
  ${media.sm`
    width: 100%;
  `};
`

export class Layout extends React.Component<Props, null> {
  render() {
    const disabled = !this.props.onNextButtonPressed
    const buttonText = this.props.isLastStep ? "finished" : "next"
    return (
      <Container>
        <MainTitle>{this.props.title} </MainTitle>
        <Subtitle>{this.props.subtitle}</Subtitle>
        <div>{this.props.children}</div>
        <ButtonContainer
          disabled={disabled}
          onClick={this.props.onNextButtonPressed}
        >
          {buttonText}
        </ButtonContainer>
      </Container>
    )
  }
}
