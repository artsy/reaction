import * as React from "react"

import Input from "../../input"
import { StepProps } from "../types"
import { Layout } from "./layout"

export default class Artists extends React.Component<StepProps, null> {
  onInputChange = e => {
    // this.props.onStateChange({ nextButtonEnabled: true })
  }

  render() {
    return (
      <Layout
        title="Follow a few artists that interest you most"
        subtitle="Follow one or more"
        onNextButtonPressed={null}
      >
        <div>
          <Input onChange={this.onInputChange} />
        </div>
      </Layout>
    )
  }
}
