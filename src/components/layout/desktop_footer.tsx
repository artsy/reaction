import * as React from "react"
import styled from "styled-components"
import * as fonts from "../../assets/fonts"

const asideWidth = 28
const columnWidth = (100 - asideWidth) / 4

const Footer = styled.footer`
  ${fonts.secondary.style}
  background-color: white;
  padding: 20px 0;
  .column, .column-aside {
    float: left;
    line-height: 1.7;
    padding-right: 20px;
    a {
      display: block;
      text-decoration: none;
      color: black;
      display: block;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .column {
    width: ${columnWidth}%;
    h4 {
      ${fonts.primary.style}
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
  .column-aside {
    width: ${asideWidth}%;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    h4 {
      font-weight: bold;
      margin: 5px 0;
    }
  }
`

export default class DesktopFooter extends React.Component<any, null> {
  render() {
    return (
      <Footer>
        <div className="column">
          <h4>Collecting</h4>
          <a href="/consign">Consign with Artsy</a>
          <a href="/professional-buyer">Artsy for Professional Buyers</a>
        </div>
        <div className="column">
          <h4>Education</h4>
          <a href="/artsy-education">Education</a>
          <a href="/about/the-art-genome-project">The Art Genome Project</a>
        </div>
        <div className="column">
          <h4>About Artsy</h4>
          <a href="/about">About</a>
          <a href="/about/jobs">Jobs</a>
          <a href="http://artsy.github.com/open-source/" target="_blank">Open Source</a>
          <a href="/about/press">Press</a>
        </div>
        <div className="column">
          <h4>Partnering with Artsy</h4>
          <a href="/gallery-partnerships">Artsy for Galleries</a>
          <a href="/institution-partnerships">Artsy for Museums</a>
          <a href="/auction-partnerships">Artsy for Auctions</a>
        </div>
        <div className="column-aside">
          <div>
            <h4>General questions & feedback?</h4>
            <a href="/contact">Contact Artsy</a>
          </div>
        </div>
      </Footer>
    )
  }
}
