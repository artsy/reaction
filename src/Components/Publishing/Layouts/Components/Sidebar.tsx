import { once } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { track } from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"
import { EmailPanel } from "../../Email/EmailPanel"
import { RelatedArticlesPanel } from "../../RelatedArticles/RelatedArticlesPanel"

export interface SidebarProps {
  emailSignupUrl?: string
  DisplayPanel?: any
  relatedArticlesForPanel?: any
  tracking?: any
}

export class Sidebar extends React.Component<SidebarProps> {
  trackRelatedImpression = () => {
    const { tracking } = this.props

    tracking.trackEvent({
      action: "Impression",
      impression_type: "Related articles",
    })
  }

  render() {
    const { emailSignupUrl, DisplayPanel, relatedArticlesForPanel } = this.props

    return (
      <SidebarContainer>
        {emailSignupUrl && (
          <SidebarItem>
            <EmailPanel signupUrl={emailSignupUrl} />
          </SidebarItem>
        )}

        {relatedArticlesForPanel && (
          <SidebarItem>
            <RelatedArticlesPanel
              label={"Related Stories"}
              articles={relatedArticlesForPanel}
            />
            <Waypoint onEnter={once(this.trackRelatedImpression)} />
          </SidebarItem>
        )}

        {DisplayPanel && <DisplayPanel />}
      </SidebarContainer>
    )
  }
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: -58px 0 0 60px;
  min-width: 280px;
  ${pMedia.xl`
    margin-left: 40px;
  `} ${pMedia.lg`
    display: none;
  `};
`

const SidebarItem = styled.div`
  margin-bottom: 40px;
`

export default track()(Sidebar)
