import * as React from "react"
import styled from "styled-components"

import SelectableToggle from "../SelectableToggle"
import { StepProps } from "../Types"
import { Layout } from "./Layout"

const OptionsContainer = styled.div`
width: 450px;
margin: 0 auto 100px;
&:last-child {
  border-bottom: 1px solid #e5e5e5;
}
`

interface State {
  selection: string
}

export default class Budget extends React.Component<StepProps, State> {
  options = [
    "UNDER $500",
    "UNDER $2,500",
    "UNDER $5,000",
    "UNDER $10,000",
    "UNDER $25,000",
    "UNDER $50,000",
    "NO BUDGET IN MIND",
  ]

  constructor(props) {
    super(props)

    this.state = {
      selection: "",
    }
  }

  onOptionSelected = (index: number) => {
    let selection = { selection: this.options[index] }
    this.setState(selection)
  }

  submit() {
    null // coming soooon
  }

  render() {
    const options = this.options.map((text, index) =>
      <SelectableToggle
        key={index}
        text={text}
        onSelect={this.onOptionSelected.bind(this, index)}
        selected={this.state.selection === text}
      />
    )

    return (
      <Layout
        title="What's your budget?"
        subtitle="Select one"
        onNextButtonPressed={this.state.selection !== "" && this.submit.bind(this)}
      >
        <OptionsContainer>
          {options}
        </OptionsContainer>
      </Layout>
    )
  }
}
