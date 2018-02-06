import React from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"

import Colors from "../../../Assets/Colors"
import { ContextConsumer, ContextProps } from "../../Artsy"
import { media } from "../../Helpers"
import SelectableToggle from "../SelectableToggle"
import { StepProps } from "../Types"
import { Layout } from "./Layout"

const OptionsContainer = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  &:last-child {
    border-bottom: 1px solid ${Colors.grayRegular};
  }
  ${media.sm`
    width: 100%;
    margin-bottom: 20px;
  `};
`

type Props = StepProps & ContextProps

interface State {
  selectedOptions: { [option: string]: boolean }
  selectedCount: number
  error?: string
}

class CollectorIntent extends React.Component<Props, State> {
  static slug = "interests"

  intentEnum = {
    "buy art & design": "BUY_ART_AND_DESIGN",
    "sell art & design": "SELL_ART_AND_DESIGN",
    "research art prices": "RESEARCH_ART_PRICES",
    "learn about art": "LEARN_ABOUT_ART",
    "find out about new exhibitions": "FIND_ART_EXHIBITS",
    "read art market news": "READ_ART_MARKET_NEWS",
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedOptions: {},
      selectedCount: 0,
    }
  }

  onOptionSelected = (index) => {
    const selectedOptions = Object.assign({}, this.state.selectedOptions)
    selectedOptions[index] = !selectedOptions[index]

    this.setState({
      selectedOptions,
      selectedCount: Object.values(selectedOptions).filter(isSelected => isSelected).length
    })
  }

  submit() {
    const intents = Object.values(this.intentEnum).filter((_, index) => this.state.selectedOptions[index])

    commitMutation(this.props.relayEnvironment, {
      mutation: graphql`
        mutation CollectorIntentUpdateCollectorProfileMutation(
          $input: UpdateCollectorProfileInput!
        ) {
          updateCollectorProfile(input: $input) {
            intents
          }
        }
      `,
      variables: {
        input: {
          intents,
        },
      },
    })

    this.props.onNextButtonPressed()
  }

  render() {
    const options = Object.keys(this.intentEnum).map((text, index) => (
      <SelectableToggle
        key={index}
        text={text}
        onSelect={this.onOptionSelected.bind(this, index)}
        selected={this.state.selectedOptions[index]}
      />
    ))

    return (
      <Layout
        title="Get started on Artsy, what are you most interested in doing?"
        subtitle="Select all that apply"
        onNextButtonPressed={
          this.state.selectedCount > 0 ? this.submit.bind(this) : null
        }
      >
        <OptionsContainer>{options}</OptionsContainer>
      </Layout>
    )
  }
}

export default ContextConsumer(CollectorIntent)
