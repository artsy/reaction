import { get, omit } from "lodash"
import React from "react"
import styled from "styled-components"
import { ResponsiveDeprecated } from "../../../Utils/ResponsiveDeprecated"
import { pMedia } from "../../Helpers"
import { ArticleProps } from "../Article"
import { DisplayPanel } from "../Display/DisplayPanel"
import { Header } from "../Header/Header"
import ReadMore from "../ReadMore/ReadMoreButton"
import { ReadMoreWrapper } from "../ReadMore/ReadMoreWrapper"
import { Sections } from "../Sections/Sections"
import { CanvasFooter } from "./Components/CanvasFooter"
import { Sidebar } from "./Components/Sidebar"

interface ArticleState {
  isTruncated: boolean
}

export class StandardLayout extends React.Component<
  ArticleProps,
  ArticleState
> {
  static defaultProps = {
    isMobile: false,
    isSuper: false,
    article: {},
    isTruncated: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated || false,
    }
  }

  removeTruncation = () => {
    this.setState({ isTruncated: false })
  }

  render() {
    const {
      article,
      display,
      emailSignupUrl,
      relatedArticlesForCanvas,
      relatedArticlesForPanel,
      renderTime,
      showTooltips,
    } = this.props
    const { isTruncated } = this.state

    const campaign = omit(display, "panel", "canvas")
    // const displayOverflows = display && display.canvas.layout === "slideshow"

    return (
      // FIXME: Update with new version
      <ResponsiveDeprecated initialState={{ isMobile: this.props.isMobile }}>
        {({ isMobile, xs, sm, md }) => {
          const hasPanel = get(display, "panel", false)
          const isMobileAd = Boolean(isMobile || xs || sm || md)

          const DisplayPanelAd = () => {
            return (
              hasPanel && (
                <DisplayPanel
                  isMobile={isMobileAd}
                  unit={display.panel}
                  campaign={campaign}
                  article={article}
                  renderTime={renderTime}
                />
              )
            )
          }
          return (
            <div>
              <ReadMoreWrapper
                isTruncated={isTruncated}
                hideButton={this.removeTruncation}
              >
                <Header article={article} />

                <StandardLayoutParent>
                  <StandardLayoutContainer>
                    <Sections
                      DisplayPanel={DisplayPanelAd}
                      article={article}
                      isMobile={isMobile}
                      showTooltips={showTooltips}
                    />
                    <Sidebar
                      emailSignupUrl={emailSignupUrl}
                      DisplayPanel={DisplayPanelAd}
                      relatedArticlesForPanel={relatedArticlesForPanel}
                    />
                  </StandardLayoutContainer>
                </StandardLayoutParent>
              </ReadMoreWrapper>

              {isTruncated && <ReadMore onClick={this.removeTruncation} />}

              {(relatedArticlesForCanvas || display) && (
                <CanvasFooter
                  article={article}
                  display={display}
                  relatedArticles={relatedArticlesForCanvas}
                  renderTime={renderTime}
                />
              )}
            </div>
          )
        }}
      </ResponsiveDeprecated>
    )
  }
}

export const StandardLayoutParent = styled.div`
  margin: 0 40px 100px 40px;
  ${pMedia.sm`
    margin: 0 0 100px 0;
  `};
`

const StandardLayoutContainer = styled.div`
  max-width: 1250px;
  display: flex;
  margin: auto;
  justify-content: space-between;
`
