import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import { Truncator } from "Components/Truncator"
import React from "react"
import styled from "styled-components"
import { DisplayProps } from "styled-system"

export interface ReadMoreProps extends DisplayProps {
  isExpanded?: boolean
  maxLineCount?: number
  onReadMoreClicked?: () => void
}

export interface ReadMoreState {
  isExpanded: boolean
}

@track()
export class ReadMore extends React.Component<ReadMoreProps, ReadMoreState> {
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

  @track({
    action_type: Schema.ActionType.Click,
    subject: "Read more",
  })
  expandText() {
    this.setState(
      {
        isExpanded: true,
      },
      () => {
        this.props.onReadMoreClicked && this.props.onReadMoreClicked()
      }
    )
  }

  render() {
    const { isExpanded } = this.state
    const { maxLineCount } = this.props

    return (
      <Container onClick={this.expandText.bind(this)} isExpanded>
        {isExpanded ? (
          this.props.children
        ) : (
          <Truncator
            maxLineCount={maxLineCount}
            ReadMoreLink={() => <ReadMoreLink>Read more</ReadMoreLink>}
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

    <ReadMoreLinkContainer>
      ... <ReadMoreLinkText>{children}</ReadMoreLinkText>
    </ReadMoreLinkContainer>
  )
}

const ReadMoreLinkContainer = styled.span`
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
`

// NOTE: Couldn't use @artsy/palette / Sans due to root element being a `div`;
// as html content from CMS comes through as a p tag, markup is rendered invalid.
const ReadMoreLinkText = styled.span`
  display: inline;
  font-family: Unica77LLWebMedium, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`

const Container = styled.div.attrs<ReadMoreState>({})`
  cursor: ${p => (p.isExpanded ? "auto" : "pointer")};
`
