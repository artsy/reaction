import { storiesOf } from "@storybook/react"
import React from "react"

import Button from "../Buttons/Default"
import { ProgressIndicator } from "../ProgressIndicator"

interface State {
  count: number
  finished: boolean
}

class Steps extends React.Component<any, State> {
  public numberOfSteps: number = 4
  state = {
    count: 0,
    finished: false,
  }

  onClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))

    if (this.state.count === 4) {
      this.setState(prevState => ({ finished: !prevState.finished }))
    }
  }

  render(): JSX.Element {
    const completedPercentage = this.state.count / this.numberOfSteps

    return (
      <div>
        <ProgressIndicator
          percentComplete={this.state.count >= 4 ? 1 : completedPercentage}
        />

        <div>
          {this.state.finished ? (
            <p>Finished</p>
          ) : (
            <p>Completed step: {this.state.count}</p>
          )}
        </div>

        <Button disabled={this.state.count === 4} onClick={this.onClick}>
          {this.state.count >= 3 ? "Finish" : "Next"}
        </Button>
      </div>
    )
  }
}

storiesOf("Components/ProgressIndicator", module).add(
  "Progress Indicator",
  () => <Steps />
)
