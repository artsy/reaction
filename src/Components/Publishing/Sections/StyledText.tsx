import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { ArticleLayout } from "../Typings"

interface StyledTextProps {
  color?: string
  isContentStart?: boolean
  layout: ArticleLayout
  postscript?: Boolean
}

const div: StyledFunction<StyledTextProps & React.HTMLProps<HTMLDivElement>> =
  styled.div

function getBlockquoteSize(layout, size) {
  const desktop = size === "lg"

  switch (layout) {
    case "feature": {
      return desktop ? Fonts.unica("s40") : Fonts.unica("s34")
    }
    case "news": {
      return desktop
        ? Fonts.unica("s19", "medium")
        : Fonts.unica("s16", "medium")
    }
    default: {
      return desktop ? Fonts.garamond("s40") : Fonts.garamond("s34")
    }
  }
}

export const StyledText = div`
  position: relative;
  padding-bottom: ${props => (props.postscript ? "2em" : "")};
  width: 100%;
  a {
    color: ${props => props.color};
    text-decoration: none;
    position: relative;
    background-image: linear-gradient(to bottom,transparent 0, ${props =>
      props.color === "black" ? "#333" : props.color} 1px,transparent 0);
    background-size: 1.25px 4px;
    background-repeat: repeat-x;
    background-position: bottom;
    &:hover {
      color: ${props => (props.color === "black" ? "#999" : props.color)};
      opacity:  ${props => (props.color === "black" ? "1" : ".65")};
    }
  }
  p, ul, ol,
  div[data-block=true] .public-DraftStyleDefault-block {
    ${props =>
      props.layout === "classic"
        ? Fonts.garamond("s19")
        : Fonts.garamond("s23")}
    padding-top: ${props => (props.layout === "classic" ? ".75em" : "1em")};
    padding-bottom: ${props => (props.layout === "classic" ? ".75em" : "1em")};
    margin: 0;
    font-style: ${props => (props.postscript ? "italic" : "inherit")};
  }
  p:first-child,
  div[data-block=true]:first-child .public-DraftStyleDefault-block {
    padding-top: 0;
  }
  p:last-child,
  div[data-block=true]:last-child .public-DraftStyleDefault-block {
    padding-bottom: 0;
  }
  ul, ol {
    padding-left: 1em;
  }
  li {
    ${props =>
      props.layout === "classic"
        ? Fonts.garamond("s19")
        : Fonts.garamond("s23")}
    padding-top: .5em;
    padding-bottom: .5em;
  }
  h1 {
    ${Fonts.unica("s40")}
    font-weight: normal;
    padding-top: 107px;
    padding-bottom: 46px;
    margin: 0;
    position: relative;
    text-align: center;
    &:before {
      content: "";
      width: 15px;
      height: 15px;
      background: black;
      border-radius: 50%;
      position: absolute;
      top: 69px;
      right: calc(50% - 7.5px);
    }
  }
  h2 {
    ${props =>
      props.layout === "classic" ? Fonts.garamond("s28") : Fonts.unica("s32")}
    font-weight: normal;
    margin: 0;
    a {
      background-size: 1.25px 1px;
    }
  }
  h3 {
    ${props =>
      props.layout === "classic" ? Fonts.avantgarde("s13") : Fonts.unica("s19")}
    font-weight: normal;
    padding-top: 23px;
    margin: 0;
    strong {
      font-weight: normal;
      ${props =>
        props.layout !== "classic" ? Fonts.unica("s19", "medium") : ""}
    }
    em {
      font-style: ${props => (props.layout === "classic" ? "normal" : "")};
    }
    a {
      background-size: 1.25px 1px;
    }
  }
  blockquote {
    ${props => getBlockquoteSize(props.layout, "lg")}
    text-align: ${props => (props.layout === "classic" ? "center" : "left")};
    font-weight: normal;
    padding-top: 46px;
    padding-bottom: 46px;
    margin: 0;
    word-break: break-word;
    ${props =>
      props.layout === "news" &&
      `
        padding-top: 10px;
        padding-bottom: 10px;
        max-width: 560px;
        margin: auto;
      `}
    a {
      ${props =>
        props.layout === "news" &&
        `
        background-size: 1.25px 1px;
      `}
    }
  }
  p:first-child:first-letter,
  div[data-block=true]:first-child .public-DraftStyleDefault-block:first-letter {
    ${props =>
      props.isContentStart &&
      props.layout === "feature" &&
      Fonts.unica("s67", "medium")}
    ${props =>
      props.isContentStart &&
      props.layout === "feature" &&
      `
      float: left;
      line-height: .5em;
      margin-right: 10px;
      margin-top: .298em;
      text-transform: uppercase;
  `}
  }
  .content-end {
    display: inline-block;
    content: "";
    width: 12px;
    height: 12px;
    background: black;
    border-radius: 50%;
    margin-left: 12px;
  }
  .artist-follow {
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
    background: none transparent;
    &:before {
      font-family: "artsy-icons";
      content: "\ue629";
      vertical-align: -8.5px;
      line-height: 32px;
      font-size: 32px;
    }
    &:after {
      content: "Follow";
      ${Fonts.garamond("s17")}
      text-transform: none;
    }
  }
  ${props => pMedia.xs`
    p, ul, ol,
    div[data-block=true] .public-DraftStyleDefault-block {
      ${Fonts.garamond("s19")}
    }
    li {
      ${Fonts.garamond("s19")}
    }
    h1 {
      ${Fonts.unica("s34")}
    }
    h2 {
      ${props.layout === "classic" ? Fonts.garamond("s28") : Fonts.unica("s32")}
    }
    h3 {
      ${props.layout === "classic"
        ? Fonts.avantgarde("s11")
        : Fonts.unica("s16")}
      line-height: ${props.layout !== "classic" ? "1.5em" : ""};
    }
    h3 strong {
      ${props.layout !== "classic" ? Fonts.unica("s16", "medium") : ""}
    }
    blockquote {
      ${getBlockquoteSize(props.layout, "sm")};
      margin: ${props.layout === "news" ? "0 10px;" : "0"};
    }
    .content-start {
      font-size: 55px;
    }
  `}
`

StyledText.defaultProps = {
  color: "black",
}
