import { media } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface ScrollIntoViewProps {
  selector: string
  offset?: number
}
export class ScrollIntoView extends React.Component<ScrollIntoViewProps> {
  static defaultProps = {
    offset: 20,
  }

  getElementPosition = $element => {
    const rect = $element.getBoundingClientRect()
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    }
  }

  scrollIntoView = event => {
    const { selector, offset } = this.props
    const $element = document.querySelector(selector)

    if ($element) {
      const { top } = this.getElementPosition($element)
      window.scrollTo(0, top - offset)
    }
  }

  render() {
    return (
      <ClickArea onClick={this.scrollIntoView}>{this.props.children}</ClickArea>
    )
  }
}

const ClickArea = styled.div`
  display: block;

  /* FIXME: Style this right so width isn't needed */
  ${media.xs`
    width: 100%;
  `};
`
