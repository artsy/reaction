import { storiesOf } from "@storybook/react"
import React from "react"

import styled from "styled-components"
import Button from "../Buttons/Default"
import Input from "../Input"
import { TooltipError } from "../TooltipError"

const Container = styled.div`
  padding: 50px;
`

class BadButton extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { count: 0, errorMessage: "" }
  }

  showTip = () => {
    const count = this.state.count
    this.setState({
      errorMessage: this.props.message + ` (${count})`,
      count: count + 1,
    })
  }

  render(): JSX.Element {
    return (
      <Container>
        <Button onClick={this.showTip}>Click Me</Button>
        <TooltipError adjustTop="-10px">{this.state.errorMessage}</TooltipError>
        <p>
          Just some unassuming content below the button. Just some unassuming
          content below the button.
        </p>
        <p>
          Just some unassuming content below the button. Just some unassuming
          content below the button.
        </p>
        <p>
          Just some unassuming content below the button. Just some unassuming
          content below the button.
        </p>
      </Container>
    )
  }
}

class InputWithError extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: "",
    }
  }

  onBlur = e => {
    this.setState({
      errorMessage: e.target.value,
    })
  }
  render() {
    return (
      <Container>
        <Input placeholder="Type in me" onBlur={this.onBlur} />
        <TooltipError>{this.state.errorMessage}</TooltipError>
      </Container>
    )
  }
}

storiesOf("Components/Tooltip Error", module)
  .add("Short Text", () => <BadButton message="Click" />)
  .add("Medium Text", () => <BadButton message="Ceci n'est pas une erreur" />)
  // .add("Long Text", () => <BadButton message="Ceci n'est pas une erreur" />)
  // .add("Custom Max Width", () => <BadButton message="Ceci n'est pas une erreur" />)
  .add("Plain", () => (
    <Container>
      <TooltipError hide={false}>Ceci n'est pas une erreur</TooltipError>
    </Container>
  ))
  .add("With something fancy inside", () => (
    <Container>
      <TooltipError hide={false}>
        Maybe{" "}
        <span>
          <em>THIS</em>
        </span>{" "}
        is something special!
      </TooltipError>
    </Container>
  ))
  .add("For an Input", () => (
    <Container>
      <InputWithError />
    </Container>
  ))
