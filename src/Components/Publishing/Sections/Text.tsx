import ReactHtmlParser, { convertNodeToElement } from "@artsy/react-html-parser"
import { startsWith } from "lodash"
import PropTypes from "prop-types"
import React, { Component } from "react"
import styled from "styled-components"
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
    isMobile: false,
  }

  static contextTypes = {
    tooltipsData: PropTypes.object,
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

  renderLinkWithToolTip = (node: Element, index) => {
    // Dont include relay components unless necessary
    // To avoid 'regeneratorRuntime' error
    const LinkWithTooltip = require("../ToolTip/LinkWithTooltip").default
    const linkNode = node.childNodes[0]

    if (linkNode && linkNode.textContent) {
      const href = node.getAttribute("href")
      const { color } = this.props
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

  isArtistFollow = (node: Element) => {
    return (node.getAttribute("class") || "").includes("artist-follow")
  }

  artistIdToArtistFollow = (artistId: string) => {
    const data = this.context.tooltipsData
    if (!data || !data.artists) return null
    return data.artists[artistId]
  }

  renderArtistFollowButton = (node: Element) => {
    // Dont include relay components unless necessary
    // To avoid 'regeneratorRuntime' error
    const MobileFollowButton = require("../../FollowButton/MobileFollowArtistButton")
      .MobileFollowArtistButtonQueryRenderer
    const FollowButton = require("../../FollowButton/FollowArtistButton")
      .FollowArtistButtonFragmentContainer

    const artistId = node.getAttribute("data-id")
    const artist = this.artistIdToArtistFollow(artistId)
    const props = { artist }

    return (
      <FollowContainer key={artistId}>
        {!this.props.showTooltips ? (
          <MobileFollowButton artistId={artistId} />
        ) : (
          <FollowButton {...props} />
        )}
      </FollowContainer>
    )
  }

  transformNode = (node: Element, index) => {
    if (node.tagName === "P") {
      const newNode = node.ownerDocument.createElement("div")
      newNode.setAttribute("class", "paragraph")
      Array.from(node.childNodes).forEach(child => newNode.appendChild(child))
      return convertNodeToElement(newNode, index, this.transformNode)
    }

    if (node.tagName === "A") {
      if (this.isArtistFollow(node)) {
        return this.renderArtistFollowButton(node)
      }
      if (this.props.showTooltips && this.shouldShowTooltipForURL(node)) {
        return this.renderLinkWithToolTip(node, index)
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
          <div>{ReactHtmlParser(html, { transform: this.transformNode })}</div>
        ) : (
          children
        )}
      </StyledText>
    )
  }
}

const FollowContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
`
