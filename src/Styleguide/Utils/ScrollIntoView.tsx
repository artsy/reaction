import React from "react"
import styled from "styled-components"

interface ScrollIntoViewProps {
  selector: string
  smooth?: boolean
}
export class ScrollIntoView extends React.Component<ScrollIntoViewProps> {
  static defaultProps = {
    smooth: false,
  }

  scrollIntoView = event => {
    const { smooth, selector } = this.props
    const $selector = document.querySelector(selector)

    if ($selector) {
      $selector.scrollIntoView({
        block: "start",
        smooth: smooth ? "smooth" : "instant",
      } as ScrollIntoViewOptions)
    }
  }

  render() {
    return (
      <ClickArea onClick={this.scrollIntoView}>{this.props.children}</ClickArea>
    )
  }
}

const ClickArea = styled.div`
  display: inline-block;
  width: 100%;
`
