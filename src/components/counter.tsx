import * as React from "react"

import styled from "styled-components"

import WideButton from "./wide_button"

const RedLabel = styled.div`
  color: red;
`


class CounterLabel extends React.Component<any, null> {
  render() {
    return <RedLabel>{this.props.counter}</RedLabel>
  }
}



// const WideButton = styled.button`
//   width: 100%;
// `

interface State {
  counter: number,
}

interface Props {
  things: string,
  counter: number,
}

export default class Counter extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { counter: props.counter }
  }

  _onClick() {
    this.setState({ counter: this.state.counter + 1 })
  }

  render() {
    return (
      <WideButton onClick={this._onClick.bind(this)}>
        <CounterLabel counter={this.state.counter} /> {this.props.things}
      </WideButton>
    )
  }
}
