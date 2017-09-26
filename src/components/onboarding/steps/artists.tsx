import * as React from "react"
import Input from "../../input"
import Step, { StepProps } from "./step"

export default class Artists extends React.Component<StepProps, any> {
  onInputChange = e => {
    this.props.onStateChange({ nextButtonEnabled: true })
  }

  render() {
    return (
      <Step
        title="Follow a few artists that interest you most"
        subtitle="Follow one or more"
        onStateChange={this.props.onStateChange}
      >
        <div>
          <Input onChange={this.onInputChange} />
        </div>
      </Step>
    )
  }
}
