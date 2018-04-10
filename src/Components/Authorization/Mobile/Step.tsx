import React from "react"

export interface StepProps {
  // onNextButtonPressed: () => void
  onValidation?: (hasError: boolean) => void
}

export class Step extends React.Component<StepProps> {
  validate() {
    const hasError = React.Children
      .toArray(this.props.children)
      .map(input => (input as any).props.error)
      .reduce((acc, currentValue) => acc && currentValue.props.error)
    return hasError
  }
  render() {
    const { props } = this
    // if (props.onValidation) {
    //   props.onValidation(hasError)
    // }

    return <div>{props.children}</div>
  }
}

export default Step
