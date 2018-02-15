import React from "react"
import { Redirect, Route } from 'react-router'

import Events from "../../Utils/Events"
import { track } from "../../Utils/track"
import { ProgressIndicator } from "./ProgressIndicator"

import Artists from './Steps/Artists'
import { BudgetComponent as Budget } from "./Steps/Budget"
import { CollectorIntentComponent as CollectorIntent } from "./Steps/CollectorIntent"
import Genes from './Steps/Genes'

const STEPS = [
  `/personalize/${CollectorIntent.slug}`,
  `/personalize/${Artists.slug}`,
  `/personalize/${Genes.slug}`,
  `/personalize/${Budget.slug}`
]

export interface Props {
  tracking?: any
}

export interface State {
  finished: boolean
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class Wizard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
    }
  }

  onNextButtonPressed = (increaseBy, history) => {
    history.push(STEPS[STEPS.indexOf(location.pathname) + increaseBy])
  }

  onFinish = redirectTo => {
    this.setState({ finished: true })
    setTimeout(() => (window.location.href = redirectTo || "/"), 500)

    this.props.tracking.trackEvent({
      action: "Completed Onboarding",
    })
  }

  render() {
    return (
      <div>
        <Route path='/personalize/*' render={() =>
          <ProgressIndicator percentComplete={ this.state.finished ? 1 : STEPS.indexOf(location.pathname) / STEPS.length } />
        } />

        <Route path={`/personalize/${CollectorIntent.slug}`} render={props =>
          <CollectorIntent {...props} onNextButtonPressed={(increaseBy = 1) => this.onNextButtonPressed(increaseBy, props.history)} />
        } />
        <Route path={`/personalize/${Artists.slug}`} render={props =>
          <Artists {...props} onNextButtonPressed={(increaseBy = 1) => this.onNextButtonPressed(increaseBy, props.history)} />
        } />
        <Route path={`/personalize/${Genes.slug}`} render={props =>
          <Genes {...props} onNextButtonPressed={(increaseBy = 1) => this.onNextButtonPressed(increaseBy, props.history)} />
        } />
        <Route path={`/personalize/${Budget.slug}`} render={props =>
          <Budget {...props} onNextButtonPressed={() => this.onFinish(props.redirectTo)} />
        } />

        {new RegExp("/personalize(/*)$").exec(location.pathname) && <Redirect to={`/personalize/${CollectorIntent.slug}`} />}
      </div>
    )
  }
}
