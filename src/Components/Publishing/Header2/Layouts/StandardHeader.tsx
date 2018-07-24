import { space } from "@artsy/palette"
import { garamond } from "Assets/Fonts"
import React, { ReactElement } from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { Byline } from "../../Byline/Byline"
import { VerticalOrSeriesTitle } from "../../Sections/VerticalOrSeriesTitle"
import { ArticleData } from "../../Typings"

interface StandardHeaderProps {
  article?: ArticleData
  date?: string
  editTitle?: ReactElement<any>
  editVertical?: ReactElement<any>
}

export const StandardHeader: React.SFC<StandardHeaderProps> = props => {
  const { article, date, editTitle, editVertical } = props
  const vertical = (article.vertical && article.vertical.name) || editVertical

  return (
    <StandardHeaderParent>
      <StandardHeaderContainer>
        {vertical && (
          <Vertical>
            <VerticalOrSeriesTitle article={article} vertical={vertical} />
          </Vertical>
        )}
        <Title>{editTitle || article.title}</Title>
        <Byline article={article} date={date && date} />
      </StandardHeaderContainer>
    </StandardHeaderParent>
  )
}

const StandardHeaderParent = styled.div`
  margin: 0 ${space(4)}px;

  ${pMedia.sm`
    margin: 0 ${space(2)}px;
  `};
`

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1250px;
  margin: ${space(4)}px auto;
  box-sizing: border-box;

  ${pMedia.sm`
    margin: ${space(3)}px auto;
  `};
`

const Title = styled.div`
  ${garamond("s50")};
  padding-bottom: 50px;

  ${pMedia.sm`
    ${garamond("s34")}
  `};
`

const Vertical = styled.div`
  padding-bottom: ${space(1)}px;
`
