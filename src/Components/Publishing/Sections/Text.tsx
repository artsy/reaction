import ReactHtmlParser, { convertNodeToElement } from "@artsy/react-html-parser"
import { startsWith } from "lodash"
import React, { Component } from "react"
import { get } from "Utils/get"
import { ArticleLayout } from "../Typings"
import { StyledText } from "./StyledText"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
  html?: string
  isContentEnd?: boolean
  isContentStart?: boolean
  layout: ArticleLayout
  postscript?: boolean
  showTooltips?: boolean
}

interface State {
  html: string
}

export class Text extends Component<Props, State> {
  static defaultProps = {
    color: "black",
    showTooltips: false,
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

  shouldShowTooltipForURL = (node: Element) => {
    const urlBase = "https://www.artsy.net/"
    const types = ["artist/", "gene/"]

    for (const type of types) {
      if (startsWith(node.getAttribute("href"), urlBase + type)) {
        return true
      }
    }

    return false
  }

  transformNode = (node: Element, index) => {
    const { color } = this.props
    // Dont include relay components unless necessary
    // To avoid 'regeneratorRuntime' error
    const LinkWithTooltip = require("../ToolTip/LinkWithTooltip").default

    if (node.tagName === "P") {
      const newNode = node.ownerDocument.createElement("div")
      newNode.setAttribute("class", "paragraph")
      Array.from(node.childNodes).forEach(child => newNode.appendChild(child))
      return convertNodeToElement(newNode, index, this.transformNode)
    }

    if (node.tagName === "A" && this.shouldShowTooltipForURL(node)) {
      const href = node.getAttribute("href")
      const linkNode = node.childNodes[0]

      if (linkNode && linkNode.textContent) {
        const props = { key: href + index, url: href, color }
        const next = node.nextSibling
        const text = linkNode.textContent

        // Check to see if there's an apostrophe following a linked section of
        // text and if found, return it.
        const apostrophe = get(next, n => {
          const str = n.textContent.substr(0, 2)
          if (/[’'][a-zA-Z]/.test(str)) {
            return str
          }
        })

        if (apostrophe) {
          // Remove the apostrophe from the original text
          next.textContent = next.textContent.substring(2)
          // And wrap the whole thing with a span preventing whitespace breaks
          return (
            <span
              className="preventLineBreak"
              key={`apostropheLinkNode-${props.key}`}
            >
              <LinkWithTooltip {...props}>{text}</LinkWithTooltip>
              {apostrophe}
            </span>
          )
        }

        return <LinkWithTooltip {...props}>{text}</LinkWithTooltip>
      }
    }
  }

  render() {
    const {
      children,
      color,
      isContentStart,
      layout,
      postscript,
      showTooltips,
    } = this.props
    const { html } = this.state

    return (
      <StyledText
        className="article__text-section"
        color={color}
        isContentStart={isContentStart}
        layout={layout}
        postscript={postscript}
        showTooltips={showTooltips}
      >
        {html.length ? (
          showTooltips ? (
            <div>
              {ReactHtmlParser(html, { transform: this.transformNode })}
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          )
        ) : (
          children
        )}
      </StyledText>
    )
  }
}
