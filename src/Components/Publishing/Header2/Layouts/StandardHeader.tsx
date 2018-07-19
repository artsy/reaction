import { garamond } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { Byline } from "../../Byline/Byline"
import { VerticalOrSeriesTitle } from "../../Sections/VerticalOrSeriesTitle"
import { ArticleData } from "../../Typings"

interface StandardHeaderProps {
  article?: ArticleData
  date?: string
  editTitle?: any
  editVertical?: any
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
        <Byline article={article} layout="standard" date={date && date} />
      </StandardHeaderContainer>
    </StandardHeaderParent>
  )
}

const StandardHeaderParent = styled.div`
  margin: 0 40px;

  ${pMedia.sm`
    margin: 0 20px;
  `};
`

const StandardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1250px;
  margin: 40px auto;
  box-sizing: border-box;

  ${pMedia.sm`
    margin: 30px auto;
  `};
`

const Title = styled.div`
  ${garamond("s50")};
  margin-bottom: 50px;

  ${pMedia.sm`
    ${garamond("s34")}
  `};
`

const Vertical = styled.div`
  margin-bottom: 10px;
`
