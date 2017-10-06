import * as React from "react"
import styled from "styled-components"

import SelectableLink from "../selectable_link"
import { StepProps } from "../types"
import { Layout } from "./layout"

const OptionsContainer = styled.div`
width: 450px;
margin: 0 auto 100px;
&:last-child {
  border-bottom: 1px solid #e5e5e5;
}
`

export default class Budget extends React.Component<StepProps, null> {
  options = [
    "UNDER $500",
    "UNDER $2,500",
    "UNDER $5,000",
    "UNDER $10,000",
    "UNDER $25,000",
    "UNDER $50,000",
    "NO BUDGET IN MIND",
  ]

  onOptionSelected = () => {
    // to be continued
    null
  }

  render() {
    const options = this.options.map((text, index) =>
      <SelectableLink key={index} text={text} onSelect={this.onOptionSelected.bind(this, index)} />
    )

    return (
      <Layout title="What's your budget?" subtitle="Select one" onNextButtonPressed={null}>
        <OptionsContainer>
          {options}
        </OptionsContainer>
      </Layout>
    )
  }
}
