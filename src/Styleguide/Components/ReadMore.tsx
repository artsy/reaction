import React, { Component } from "react"
import styled from "styled-components"
import { Truncator } from "../../Components/Truncator"
import { Theme, Sans } from "@artsy/palette"

interface ReadMoreProps {
  isExpanded?: boolean
  maxLineCount?: number
}

interface ReadMoreState {
  isExpanded: boolean
}

export class ReadMore extends Component<ReadMoreProps, ReadMoreState> {
  state = {
    isExpanded: false,
  }

  static defaultProps = {
    isExpanded: false,
    maxLineCount: 3,
  }

  constructor(props) {
    super(props)

    this.state = {
      isExpanded: props.isExpanded,
    }
  }

  expandText = () => {
    this.setState({
      isExpanded: true,
    })
  }

  render() {
    const { isExpanded } = this.state
    const { maxLineCount } = this.props

    return (
      <Container onClick={this.expandText} isExpanded>
        {isExpanded ? (
          this.props.children
        ) : (
          <Truncator
            maxLineCount={maxLineCount}
            ReadMoreLink={() => <ReadMoreLink>Read More</ReadMoreLink>}
          >
            {this.props.children}
          </Truncator>
        )}
      </Container>
    )
  }
}

const ReadMoreLink = ({ children }) => {
  return (
    // TODO: Investigate why <Truncator />, when calling `renderToStaticMarkup`,
    // breaks the context chain requiring us to wrap ReadMore in a <Theme />

    <Theme>
      <ReadMoreLinkContiner>
        ... <Sans size="2">{children}</Sans>
      </ReadMoreLinkContiner>
    </Theme>
  )
}

const ReadMoreLinkContiner = styled.span`
  ${Sans} {
    cursor: pointer;
    text-decoration: underline;
  }
`

const Container = styled.div.attrs<ReadMoreState>({})`
  cursor: ${p => (p.isExpanded ? "auto" : "pointer")};
`
