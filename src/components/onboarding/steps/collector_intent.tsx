import * as React from "react"
import styled from "styled-components"

import { ContextConsumer, ContextProps } from "../../artsy"
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
    // const keys = Object.keys(this.state.selectedOptions)
    // const intents = keys.filter(key => {
    //   return this.state.selectedOptions[key]
    // })
    // console.log("intents:", intents)
    // const options: RequestInit = {
    //   method: "PUT",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "X-Requested-With": "XMLHttpRequest",
    //     "X-Access-Token": this.props.currentUser.accessToken,
    //   },
    //   body: JSON.stringify({
    //     intents: JSON.stringify(intents),
    //   }),
    // }
    // This should eventually be the collector id that is available on the props.
    // I'm thinking the endpoint should also move into some sort of sd object.
    // fetch(`https://api.artsy.net/api/v1/collector_profile/${this.props.currentUser.id}`, options)
    //   .then(res => {
    //     if (res.status >= 500) {
    //       throw new Error(`Failed with status ${res.status}`)
    //     } else if (res.status === 200) {
    //       window.analytics.track("Completed collector intent question")
    //       this.props.onNextButtonPressed()
    //     } else {
    //       // I'm also thinking the we should also handle the error differently, but
    //       // I'm not super clear what the error behavior should be yet.
    //       this.setState({
    //         error: "Invalid email or password",
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     if (process.env.NODE_ENV !== "test") {
    //       console.error(err)
    //     }
    //     this.setState({
    //       error: "Internal Error. Please contact support@artsy.net",
    //     })
    //   })
  }

  render() {
    const options = this.options.map((text, index) =>
      <SelectableLink key={index} text={text} onSelect={this.onOptionSelected.bind(this, index)} />
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
