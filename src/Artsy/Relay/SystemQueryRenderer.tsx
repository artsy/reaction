import React from "react"
import { QueryRenderer, QueryRendererProps } from "react-relay"
import { OperationBase, OperationDefaults } from "relay-runtime"

interface SystemQueryRendererState {
  isMounted: boolean
}

export class SystemQueryRenderer<
  T extends OperationBase = OperationDefaults
> extends React.Component<QueryRendererProps, SystemQueryRendererState> {
  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
  }

  render() {
    if (this.state.isMounted) {
      return <QueryRenderer<T> {...this.props} />
    } else {
      return null
    }
  }
}
