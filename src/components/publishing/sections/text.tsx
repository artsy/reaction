import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

interface DivLayoutProps {
  layout?: String
}

const div: StyledFunction<DivLayoutProps & React.HTMLProps<HTMLDivElement>> = styled.div

const Text = div`
  position: relative;
  a {
    color: black;
    text-decoration: none;
    border-bottom: 1px solid;
  }
  p, ul, ol {
    ${props => (props.layout === "classic" ? Fonts.garamond("s20") : Fonts.garamond("s23"))};
    padding-top: ${props => (props.layout === "classic" ? ".75em;" : "1em;")};
    padding-bottom: ${props => (props.layout === "classic" ? ".75em;" : "1em;")};
    margin: 0;
  }
  ul, ol {
    padding-left: 1em;  
  }
  li {
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
    ${props => (props.layout === "classic" ? Fonts.garamond("s28") : Fonts.garamond("s40"))};
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
    ${Fonts.unica("s69")};
    font-weight: normal;
    padding-top: 46px;
    padding-bottom: 46px;
    margin: 0;
  }
  .content-start {
    ${Fonts.unica("s69", "medium")};
    float: left;
    line-height: .5em;
    margin-right: 10px;
    margin-top: .298em;
    text-transform: uppercase;
  }
  .content-end {
    display: inline-block;
    content: "";
    width: 15px;
    height: 15px;
    background: black;
    border-radius: 50%;
    margin-left: 15px;
  }
  ${props => pMedia.lg`
    blockquote {
      max-width: calc(100% - 40px);
      margin: auto;
    }
  `}
  ${props => pMedia.md`
    max-width: calc(100% - 40px);
    margin: 0 auto;
    blockquote {
      max-width: 100%;
    }
  `}
  ${props => pMedia.sm`
    max-width: 100%;
  `}
`
export default Text
