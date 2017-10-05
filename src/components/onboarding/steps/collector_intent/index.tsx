import * as React from 'react';
import styled from 'styled-components';

import { ContextConsumer, ContextProps } from '../../../artsy';
import { StepProps } from '../../types';
import { Layout } from '../layout';
import Option from './option';
import updateCollectorProfile from './update_collector_profile';

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
  }

  submit() {
    const keys = Object.keys(this.state.selectedOptions)
    const intents = keys.filter(key => {
      return this.state.selectedOptions[key]
    })

    updateCollectorProfile(this.props.currentUser, { intents })
      .then(data => {
        window.analytics.track("Completed collector intent question")
        this.props.onNextButtonPressed()
      })
      .catch(err => {
        this.setState({
          error: "Invalid email or password",
        })
      })
  }

  render() {
    const options = this.options.map((text, index) =>
      <Option key={index} text={text} onSelect={this.onOptionSelected.bind(this, index)} />
    )
    return (
      <Layout
        title="Get started on Artsy, what are you most interested in doing?"
        subtitle="Select all that apply"
        onNextButtonPressed={this.state.selectedCount > 0 && this.submit.bind(this)}
      >
        <OptionsContainer>
          {options}
        </OptionsContainer>
      </Layout>
    )
  }
}

export default ContextConsumer(CollectorIntent)
