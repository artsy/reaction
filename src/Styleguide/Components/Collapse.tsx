import React from "react"
import styled from "styled-components"

export interface CollapseProps {
  open: boolean
}

export interface CollapseState {
  computedHeight: string
}

export class Collapse extends React.Component<CollapseProps, CollapseState> {
  state = {
    computedHeight: null,
  }

  private element: HTMLElement

  handleRef = element => {
    this.element = element
  }

  componentDidMount() {
    if (this.state.computedHeight === null) {
      const prevHeight = this.element.style.height
      this.element.style.height = "auto"
      const computedHeight = getComputedStyle(this.element).height
      this.element.style.height = prevHeight

      this.setState({ computedHeight })
    }
  }

  render() {
    const height = this.props.open ? this.state.computedHeight || "auto" : "0"

    return (
      <Collapseable
        innerRef={this.handleRef}
        {...this.props}
        style={{ height }}
      />
    )
  }
}

const Collapseable = styled.div`
  overflow: hidden;
  transition: height 0.25s ease-in-out;
`
