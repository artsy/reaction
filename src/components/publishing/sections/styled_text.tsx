import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import { Layout } from "../typings"

interface StyledTextProps {
  layout: Layout
  postscript?: Boolean
}

const div: StyledFunction<StyledTextProps & React.HTMLProps<HTMLDivElement>> = styled.div

function getBlockquoteSize(layout, size) {
  let font
  const desktop = size === "lg"
  if (layout === "classic") {
    font = desktop ? Fonts.garamond("s40") : Fonts.garamond("s34")
  } else if (layout === "feature") {
    font = desktop ? Fonts.unica("s65") : Fonts.unica("s40")
  } else if (layout === "standard") {
    font = desktop ? Fonts.garamond("s50") : Fonts.garamond("s40")
  }
  return font
}

const StyledText = div`
  position: relative;
  padding-bottom: ${props => (props.postscript ? "2em" : null)};
  a {
    color: black;
    text-decoration: none;
    position: relative;
    background-image: linear-gradient(to bottom,transparent 0,#333 1px,transparent 0);
    background-size: 1.25px 4px;
    background-repeat: repeat-x;
    background-position: bottom;
    &:hover {
      color: #999;
    }
  }
  p, ul, ol {
    ${props => (props.layout === "classic" ? Fonts.garamond("s19") : Fonts.garamond("s23"))};
    padding-top: ${props => (props.layout === "classic" ? ".75em;" : "1em;")};
    padding-bottom: ${props => (props.layout === "classic" ? ".75em;" : "1em;")};
    margin: 0;
    font-style: ${props => (props.postscript ? "italic;" : "inherit;")};
  }
  p:first-child {
    padding-top: 0;
  }
  p:last-child {
    padding-bottom: 0;
  }
  ul, ol {
    padding-left: 1em;  
  }
  li {
    ${props => (props.layout === "classic" ? Fonts.garamond("s19") : Fonts.garamond("s23"))};
    padding-top: .5em;
    padding-bottom: .5em;
  }
  h1 {
    ${Fonts.unica("s40")};
    font-weight: normal;
    padding-top: 107px;
    padding-bottom: 46px;
    margin: 0;
    position: relative;
    text-align: center;
  }
  h1:before {
    content: "";
    width: 15px;
    height: 15px;
    background: black;
    border-radius: 50%;
    position: absolute;
    top: 69px;
    right: calc(50% - 7.5px);
  }
  h2 {
    ${props => (props.layout === "classic" ? Fonts.garamond("s28") : Fonts.unica("s32"))};
    font-weight: normal;
    margin: 0;
  }
  h3 {
    ${props => (props.layout === "classic" ? Fonts.avantgarde("s13") : Fonts.unica("s19"))};
    font-weight: normal;
    padding-top: 23px;
    margin: 0;
    strong {
      font-weight: normal;
      ${props => (props.layout !== "classic" ? Fonts.unica("s19", "medium") : null)};
    }
    em {
      font-style: ${props => (props.layout === "classic" ? "normal" : null)};
    }
  }
  blockquote {
    ${props => getBlockquoteSize(props.layout, "lg")};
    text-align: ${props => (props.layout === "classic" ? "center" : "left")};
    font-weight: normal;
    padding-top: 46px;
    padding-bottom: 46px;
    margin: 0;
  }
  .content-start {
    ${Fonts.unica("s65", "medium")};
    float: left;
    line-height: .5em;
    margin-right: 10px;
    margin-top: .298em;
    text-transform: uppercase;
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
      ${Fonts.garamond("s17")};
      text-transform: none;
    }
  }
  ${props => pMedia.md`
    max-width: calc(100% - 40px);
    margin: 0 auto;
  `}
  ${props => pMedia.sm`
    max-width: 100%;
  `}
  ${props => pMedia.xs`
    p, ul, ol {
      ${Fonts.garamond("s19")};
    }
    li {
      ${Fonts.garamond("s19")};
    }
    h1 {
      ${Fonts.unica("s34")};
    }
    h2 {
      ${props.layout === "classic" ? Fonts.garamond("s28") : Fonts.unica("s32")};
    }
    h3 {
      strong {
        ${props.layout !== "classic" ? Fonts.unica("s16", "medium") : null};
      }
      ${props.layout === "classic" ? Fonts.avantgarde("s11") : Fonts.unica("s16")};
      line-height: ${props.layout !== "classic" ? "1.5em;" : null};
    }
    blockquote {
      ${getBlockquoteSize(props.layout, "sm")};
    }
    .content-start {
      font-size: 55px;
    }
  `}
`
export default StyledText
