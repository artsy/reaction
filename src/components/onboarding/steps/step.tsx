import * as React from "react"
import styled from "styled-components"

import Title from "../../title"

export interface StepProps {
  onStateChange: ({ nextButtonEnabled }) => void
  title: string
  subtitle: string
}

const Container = styled.div`
`

const Header = styled.div`
  text-align: center;
`

const Subtitle = styled(Title)`
  color: #999;
`

export default class Step extends React.Component<StepProps, any> {
  render() {
    return (
      <Container>
        <Header>
          <Title titleSize="xlarge">{this.props.title}</Title>
          <Subtitle titleSize="xlarge">{this.props.subtitle}</Subtitle>
        </Header>
        <div>{this.props.children}</div>
      </Container>
    )
  }
}
