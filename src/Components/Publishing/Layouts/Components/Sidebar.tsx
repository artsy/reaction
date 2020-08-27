import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { RelatedArticlesPanel } from "../../RelatedArticles/Panel/RelatedArticlesPanel"

export interface SidebarProps {
  DisplayPanel?: any
  relatedArticlesForPanel?: any
}

export const Sidebar: React.SFC<SidebarProps> = props => {
  const { DisplayPanel, relatedArticlesForPanel } = props

  return (
    <SidebarContainer>
      {relatedArticlesForPanel && (
        <SidebarItem>
          <RelatedArticlesPanel
            label={"Related Stories"}
            articles={relatedArticlesForPanel}
          />
        </SidebarItem>
      )}

      {DisplayPanel && <DisplayPanel />}
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: -58px 0 0 60px;
  min-width: 280px;
  ${pMedia.xl`
    margin-left: 40px;
  `};
  ${pMedia.lg`
    display: none;
  `};
`

const SidebarItem = styled.div`
  margin-bottom: 40px;
`
