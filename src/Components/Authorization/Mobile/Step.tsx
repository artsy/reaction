import React from "react"
import { HandleValidation } from "./Wizard"

export interface StepProps {
  // onNextButtonPressed: () => void
  onValidation?: HandleValidation
}

export class Step extends React.Component<StepProps> {
  // TODO: How should this be used and how does this relate to the onValidation
  //       prop that is being passed to this Step component?
  validate() {
    const hasError = React.Children
      .toArray(this.props.children)
      .map(input => (input as any).props.error)
      .reduce((acc, currentValue) => acc && currentValue.props.error)
    return hasError
  }

  render() {
    const { props } = this

    return <div>{props.children}</div>
  }
}

export default Step
