import { storiesOf } from "@storybook/react"
import React from "react"

import Button from "../Buttons/Default"
import { TooltipError } from "../TooltipError"

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
      <div>
        <Button onClick={this.showTip}>Click Me</Button>
        <TooltipError message={this.state.errorMessage} />
      </div>
    )
  }
}

storiesOf("Components/Tooltip Error", module).add("Short Text", () => (
  <BadButton message="no." />
))
