import * as React from "react"
import styled from "styled-components"

import Step, { StepProps } from "../step"
import Option from "./option"

const OptionsContainer = styled.div`
  width: 450px;
  margin: 0 auto 100px;
`

interface State {
  selectedOptions: { [option: string]: boolean }
  selectedCount: number
}

class CollectorIntent extends React.Component<StepProps, State> {
  options = [
    "Buy Art & Design",
    "Sell Art & Design",
    "Research Art Prices",
    "Learn About Art",
    "Find Out About New Exhibitions",
    "Read Art Market News",
  ]

  constructor(props) {
    super(props)

    this.state = {
      selectedOptions: {},
      selectedCount: 0,
    }
  }

  onOptionSelected = (index, selected) => {
    const option = this.options[index]

    let selectedOptions = this.state.selectedOptions
    selectedOptions[option] = selected

    let count = 0
    for (let key in selectedOptions) {
      if (selectedOptions[key]) count++
    }

    this.setState({ selectedOptions, selectedCount: count })
    this.props.onStateChange({ nextButtonEnabled: count > 0 })
  }

  submit() {
    //TODO: add POST call to gravity with collector intent choices
  }

  render(): JSX.Element {
    const options = this.options.map((text, index) =>
      <Option key={index} href="#" text={text} onSelect={this.onOptionSelected.bind(this, index)} />
    )
    return (
      <Step
        title="Get started on Artsy, what are you most interested in doing?"
        subtitle="Select all that apply"
        onStateChange={this.props.onStateChange}
      >
        <OptionsContainer>
          {options}
        </OptionsContainer>
      </Step>
    )
  }
}

export default CollectorIntent
