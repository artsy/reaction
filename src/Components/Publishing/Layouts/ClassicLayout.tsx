import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { Sections } from "../Sections/Sections"
import { ArticleData } from "../Typings"

export interface ArticleProps {
  article: ArticleData
  isMobile?: boolean
  areHostedAdsEnabled?: boolean
}

export const ClassicLayout: React.SFC<ArticleProps> = props => {
  return (
    <ClassicLayoutContainer>
      <Header {...props} />
      <Sections {...props} />
    </ClassicLayoutContainer>
  )
}

const ClassicLayoutContainer = styled.div`
  position: relative;
`
