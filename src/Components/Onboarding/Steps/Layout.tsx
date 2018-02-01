import React from "react"
import styled from "styled-components"

import Colors from "../../../Assets/Colors"
import InvertedButton from "../../Buttons/Inverted"
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
  margin-bottom: 30px;
  text-align: center;
  line-height: normal;
  ${media.sm`
    text-align: left;
    margin-bottom: 15px;
    font-size: 20px
  `};
`

/* MS IE11 and Edge don't support for the sticky position property */
const FixedButttonContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

/* Mobile safari doesn't support for the fixed position property:
 *   https://www.eventbrite.com/engineering/mobile-safari-why/
 **/
const StickyButtonContainer = styled.div`
  position: sticky;
  bottom: 0px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, white, white);
  display: flex;
  justify-content: center;
`

const NextButton = styled(InvertedButton)`
  margin: 50px 0px;
  display: block;
  width: 250px;

  &:disabled {
    background: white;
    border: 1px solid ${Colors.grayRegular};
    color: ${Colors.grayMedium};
  }

  ${media.sm`
    width: 100%;
    margin: 25px 0px;
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
        <FixedButttonContainer>
          <StickyButtonContainer>
            <NextButton
              disabled={disabled}
              onClick={this.props.onNextButtonPressed}
            >
              {buttonText}
            </NextButton>
          </StickyButtonContainer>
        </FixedButttonContainer>
      </Container>
    )
  }
}
