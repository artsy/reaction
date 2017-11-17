import * as React from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"

import { ContextConsumer, ContextProps } from "../../Artsy"
import SelectableLink from "../SelectableLink"
import { StepProps } from "../Types"
import { Layout } from "./Layout"

const OptionsContainer = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`

type Props = StepProps & ContextProps

interface State {
  selectedOptions: { [option: string]: boolean }
  selectedCount: number
  error?: string
}

class CollectorIntent extends React.Component<Props, State> {
  options = [
    "buy art & design",
    "sell art & design",
    "research art prices",
    "learn about art",
    "find out about new exhibitions",
    "read art market news",
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
  }

  submit() {
    const keys = Object.keys(this.state.selectedOptions)
    const intents = keys.filter(key => {
      return this.state.selectedOptions[key]
    })

    commitMutation(this.props.relayEnvironment, {
      mutation: graphql`
        mutation CollectorIntentUpdateCollectorProfileMutation($input: UpdateCollectorProfileInput!) {
          updateCollectorProfile(input: $input) {
            intents
          }
        }
      `,
      variables: {
        input: {
          intents: { intents },
        },
      },
    })
  }

  render() {
    const options = this.options.map((text, index) => (
      <SelectableLink key={index} text={text} onSelect={this.onOptionSelected.bind(this, index)} />
    ))
    return (
      <Layout
        title="Get started on Artsy, what are you most interested in doing?"
        subtitle="Select all that apply"
        onNextButtonPressed={this.state.selectedCount > 0 && this.submit.bind(this)}
      >
        <OptionsContainer>{options}</OptionsContainer>
      </Layout>
    )
  }
}

export default ContextConsumer(CollectorIntent)
