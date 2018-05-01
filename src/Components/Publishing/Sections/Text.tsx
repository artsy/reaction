import React, { Component } from "react"
import { ArticleLayout } from "../Typings"
import { StyledText } from "./StyledText"
import ReactHtmlParser from "react-html-parser"
import { LinkWithTooltip } from "../ToolTip/LinkWithTooltip"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
  html?: string
  isContentEnd?: boolean
  isContentStart?: boolean
  layout: ArticleLayout
  postscript?: boolean
}

interface State {
  html: string
}

export class Text extends Component<Props, State> {
  static defaultProps = {
    color: "black",
  }

  state = {
    html: this.props.html || "",
  }

  componentDidMount() {
    const html = this.htmlMaybeWithContentEnd()

    this.setState({ html })
  }

  htmlMaybeWithContentEnd = () => {
    const { html } = this.state
    const { isContentEnd } = this.props
    // Remove existing spans - TODO: Backfill out of articles
    const cleanedHtml = html.replace("<span class='content-end'> </span>", "")

    if (isContentEnd) {
      const doc = document.createElement("div")
      doc.innerHTML = cleanedHtml

      const paragraphs = doc.getElementsByTagName("P")
      const lastParagraph =
        paragraphs.length && paragraphs[paragraphs.length - 1]
      if (lastParagraph) {
        // insert content-end in last paragraph
        lastParagraph.innerHTML =
          lastParagraph.innerHTML + "<span class='content-end'> </span>"
      }
      return doc.innerHTML
    }
    return cleanedHtml
  }

  render() {
    const { children, color, isContentStart, layout, postscript } = this.props
    const { html } = this.state

    const transform = node => {
      if (node.type === "a") {
        console.log(node)
        return <LinkWithTooltip url={node.href} />
      }
    }

    return (
      <StyledText
        className="article__text-section"
        color={color}
        isContentStart={isContentStart}
        layout={layout}
        postscript={postscript}
      >
        {html.length ? (
          <div>{ReactHtmlParser(html, { transform })}</div>
        ) : (
          children
        )}
      </StyledText>
    )
  }
}
