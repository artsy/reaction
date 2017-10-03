import * as React from 'react';
import styled from 'styled-components';

import Title from '../../title';

export interface StepProps {
  onStateChange: ({ nextButtonEnabled }) => void
  title: string
  subtitle: string
}

const Container = styled.div`
  max-width: 930px;
  margin-left: auto;
  margin-right: auto;
`

const MainTitle = styled(Title) `
  text-align: center;
`
const Subtitle = styled(Title) `
  color: #999;
  margin-bottom: 100px;
  text-align: center;
`

export default class Step extends React.Component<StepProps, any> {
  render() {
    return (
      <Container>
        <MainTitle titleSize="xlarge">{this.props.title} </MainTitle>
        <Subtitle titleSize="xlarge">{this.props.subtitle}</Subtitle>
        <div>{this.props.children}</div>
      </Container>
    )
  }
}
