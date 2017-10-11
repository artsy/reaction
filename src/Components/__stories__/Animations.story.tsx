import { storiesOf } from "@storybook/react"
import * as React from "react"

import styled from "styled-components"
import {fadeIn, fadeOut, slideInDown, slideInLeft, slideInUp, slideInRight} from "../../Assets/Animations"
import Button from "../Buttons/Default"
import { Col, Row } from "../Grid"
import Icon from "../Icon"

interface AnimationExampleProps {
  button: string
}

interface VisibilityState {
  show: boolean
}

class AnimationExample extends React.Component<AnimationExampleProps, VisibilityState> {
  constructor(props) {
    super(props)
    this.state = { show: true }
  }

  onClick() {
    this.setState({ show: false })

    // setTimeout is used just for the sake of demo and shouldn't be used in production.
    setTimeout((() => this.setState({ show: true })).bind(this), 100)
  }

  render() {
    return (
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={3} sm={3} md={3} lg={3}>
          <Button onClick={this.onClick.bind(this)}>{this.props.button}</Button>
        </Col>
        <Col xs sm md lg>
          {this.state.show && this.props.children}
        </Col>
      </Row>
    )
  }
}

const FadeIn = styled.div`${fadeIn}`
const FadeOut = styled.div`${fadeOut}`
const SlideInDown = styled.div`${slideInDown}`
const SlideInLeft = styled.div`${slideInLeft}`
const SlideInRight = styled.div`${slideInRight}`
const SlideInUp = styled.div`${slideInUp}`

storiesOf("Components/Animations", module).add("All Animations", () => {
  return (
    <div style={{ margin: "40px" }}>
      <AnimationExample button='Fade in'>
        <FadeIn>
          <Icon name='logotype' fontSize="60px" color="black" />
        </FadeIn>
      </AnimationExample>
      <AnimationExample button='Fade out'>
        <FadeOut>
          <Icon name='logotype' fontSize="60px" color="black" />
        </FadeOut>
      </AnimationExample>
      <AnimationExample button='Slide in down'>
        <SlideInDown>
          <Icon name='logotype' fontSize="60px" color="black" />
        </SlideInDown>
      </AnimationExample>
      <AnimationExample button='Slide in left'>
        <SlideInLeft>
          <Icon name='logotype' fontSize="60px" color="black" />
        </SlideInLeft>
      </AnimationExample>
      <AnimationExample button='Slide in right'>
        <SlideInRight>
          <Icon name='logotype' fontSize="60px" color="black" />
        </SlideInRight>
      </AnimationExample>
      <AnimationExample button='Slide in up'>
        <SlideInUp>
          <Icon name='logotype' fontSize="60px" color="black" />
        </SlideInUp>
      </AnimationExample>
    </div>
  )
})
