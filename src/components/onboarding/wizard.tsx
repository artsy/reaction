import * as React from 'react';
import styled from 'styled-components';

import Button from '../buttons/default';

const ButtonContainer = styled(Button) `
  margin: 0 auto 50px;
  display: block;
  width: 250px;

`

interface Props {
  stepComponents: Array<React.ComponentClass<any>>
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

class Wizard extends React.Component<Props, State> {
  currentStepComponent: any

  constructor(props, state) {
    super(props, state)

    this.state = {
      currentStep: 0,
      nextButtonEnabled: false,
    }
  }

  getCurrentStep(): JSX.Element | null {
    const currentStep = this.state.currentStep
    if (currentStep > this.props.stepComponents.length - 1) {
      return null
    }

    const Step = this.props.stepComponents[currentStep]
    return <Step onStateChange={this.onStepStateChanged.bind(this)} ref={step => (this.currentStepComponent = step)} />
  }

  onStepStateChanged(state: boolean) {
    this.setState({
      nextButtonEnabled: state,
    })
  }

  onNextButtonPressed(e) {
    if (this.props.stepComponents.length <= this.state.currentStep) {
      return
    }

    this.currentStepComponent.submit(e)

    const stepIndex = this.state.currentStep + 1
    this.setState({ currentStep: stepIndex })
  }

  render() {
    const step = this.getCurrentStep()
    return (
      <div>
        {step}
        <ButtonContainer disabled={!this.state.nextButtonEnabled} onClick={this.onNextButtonPressed.bind(this)}>
          Next
        </ButtonContainer>
      </div>
    )
  }
}

export default Wizard
