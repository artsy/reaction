import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import { isString } from "lodash"
import React, { Component } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import styled from "styled-components"
import { DisplayProps } from "styled-system"
import truncate from "trunc-html"

export interface ReadMoreProps extends DisplayProps {
  isExpanded?: boolean
  maxChars?: number
  onReadMoreClicked?: () => void
  content: string | JSX.Element
}

export interface ReadMoreState {
  isExpanded: boolean
}

@track()
export class ReadMore extends Component<ReadMoreProps, ReadMoreState> {
  state = {
    isExpanded: true,
  }

  static defaultProps = {
    isExpanded: false,
    maxChars: Infinity,
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

  getContent() {
    const { isExpanded } = this.state
    const { content } = this.props

    const html = isString(content)
      ? content
      : renderToStaticMarkup(<>{content}</>)

    if (isExpanded) {
      return html
    } else {
      return truncate(html, this.props.maxChars).html
    }
  }

  render() {
    const content = this.getContent()

    return (
      <Container onClick={this.expandText.bind(this)} isExpanded>
        <span
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

        {!this.state.isExpanded && <ReadMoreLink>Read more</ReadMoreLink>}
      </Container>
    )
  }
}

const ReadMoreLink = ({ children }) => {
  return (
    <span>
      {" "}
      <ReadMoreLinkContainer>
        <ReadMoreLinkText>{children}</ReadMoreLinkText>
      </ReadMoreLinkContainer>
    </span>
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

  > span > * {
    display: inline;
  }
`
