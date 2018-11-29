import { debounce } from "lodash"
import qs from "querystring"
import React, { Component } from "react"
import { MinimalCtaBanner } from "../../MinimalCtaBanner"
import { getArticleFullHref } from "../Constants"
import { ArticleData } from "../Typings"

export interface State {
  showCtaBanner: boolean
}

export enum CtaCopy {
  news = "Sign up for the best in art world news",
  default = "Sign up to get our best stories everyday",
}

export class BannerWrapper extends Component<{ article: ArticleData }, State> {
  state = {
    showCtaBanner: false,
  }
  lastScrollPosition: number = 0

  handleScroll() {
    const newScrollPosition = window.scrollY
    let showCtaBanner = this.state.showCtaBanner

    if (newScrollPosition <= this.lastScrollPosition) {
      // scrolling up the page
      if (this.state.showCtaBanner) {
        showCtaBanner = false
      }
    } else {
      // scrolling down the page
      if (!this.state.showCtaBanner) {
        showCtaBanner = true
      }
    }

    if (this.state.showCtaBanner !== showCtaBanner) {
      this.setState({ showCtaBanner })
    }
    this.lastScrollPosition = newScrollPosition
  }

  componentDidMount() {
    if (window) {
      window.addEventListener("scroll", debounce(() => this.handleScroll(), 10))
    }
  }

  render() {
    const { layout, slug } = this.props.article
    const copy = layout === "news" ? CtaCopy.news : CtaCopy.default
    const backgroundColor = layout === "video" ? "white" : "black"
    const textColor = layout === "video" ? "black" : "white"

    return (
      <MinimalCtaBanner
        href={`/sign_up?${qs.stringify({
          action: "editorialSignup",
          intent: "viewed editorial",
          trigger: "click",
          contextModule: "auth minimal cta banner",
          "redirect-to": getArticleFullHref(slug),
        })}`}
        height="55px"
        copy={copy}
        position="bottom"
        textColor={textColor}
        backgroundColor={backgroundColor}
        show={this.state.showCtaBanner}
      />
    )
  }
}
