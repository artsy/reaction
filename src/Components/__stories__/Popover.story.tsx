import { storiesOf } from "@storybook/react"
import React from "react"

import styled from "styled-components"
import Button from "../Buttons/Default"
import Input from "../Input"
import { Popover } from "../Popover"

const Container = styled.div`
  padding: 50px;
  height: 1400px;
`

class ErrorShower extends React.Component<any, any> {
  public buttonRef
  state = { count: 0, errorMessage: "", showError: false }
  showTip = () => {
    const count = this.state.count + 1
    this.setState({
      showError: true,
      count,
    })
  }
  render(): JSX.Element {
    return (
      <Container>
        <Button ref={r => (this.buttonRef = r)} onClick={this.showTip}>
          Click Me
        </Button>
        <Popover
          minWidth={this.props.minWidth}
          show={this.state.showError}
          message={() => this.props.msgTemplate(this.state.count)}
          anchorRef={this.buttonRef}
        />
        <p>Just some content below the button.</p>
        <p>Just some content below the button.</p>
        <p>Just some content below the button.</p>
      </Container>
    )
  }
}

class InputWithError extends React.Component<any, any> {
  private inputRef

  state = {
    errorMessage: "",
    showError: false,
  }

  onBlur = e => {
    this.setState({
      errorMessage: e.target.value,
      showError: true,
    })
  }
  render() {
    return (
      <Container>
        <Input
          ref={r => (this.inputRef = r)}
          placeholder="Type in me"
          onBlur={this.onBlur}
        />
        <Popover
          show={this.state.showError}
          message={() => this.state.errorMessage}
          anchorRef={this.inputRef}
        />
      </Container>
    )
  }
}

storiesOf("Components/Popover", module)
  .add("Basic", () => <ErrorShower msgTemplate={() => "Cool"} />)
  .add("Long Text", () => (
    <ErrorShower
      minWidth="200px"
      msgTemplate={count =>
        Array(5)
          .fill(`Ceci n'est pas une erreur.`)
          .concat(count)
          .join(" ")}
    />
  ))
  .add("With something clickable inside", () => {
    const Fancy = () => (
      <a
        onClick={e => {
          e.stopPropagation()
          alert("nice click")
        }}
      >
        <em>THIS</em>
      </a>
    )
    return (
      <ErrorShower
        msgTemplate={count => (
          <div>
            Now{" "}
            <span>
              <Fancy />
            </span>{" "}
            is something special!
          </div>
        )}
      />
    )
  })
  .add("For an Input", () => <InputWithError />)
