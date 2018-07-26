import { space } from "@artsy/palette"
import { garamond } from "Assets/Fonts"
import React, { ReactElement } from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { ClassicByline } from "../../Byline/ClassicByline"
import { ArticleData } from "../../Typings"

interface ClassicHeaderProps {
  article?: ArticleData
  date?: string
  editLeadParagraph?: ReactElement<any>
  editTitle?: ReactElement<any>
}

export const ClassicHeader: React.SFC<ClassicHeaderProps> = props => {
  const { article, date, editTitle, editLeadParagraph } = props
  return (
    <ClassicHeaderContainer>
      <Title>{editTitle || article.title}</Title>

      {editLeadParagraph ? (
        <LeadParagraph>{editLeadParagraph}</LeadParagraph>
      ) : (
        <LeadParagraph
          dangerouslySetInnerHTML={{ __html: article.lead_paragraph }}
        />
      )}
      <ClassicByline article={article} date={date} />
    </ClassicHeaderContainer>
  )
}

const ClassicHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  margin: ${space(4)}px auto;
  box-sizing: border-box;
  text-align: center;

  ${pMedia.xl`padding: 0 ${space(2)}px;`};

  ${pMedia.xs`
    text-align: left;
  `};
`

export const Title = styled.div`
  padding-bottom: ${space(3)}px;
  ${garamond("s37")};

  ${pMedia.xs`
    ${garamond("s34")}
  `};
`

export const LeadParagraph = styled.div`
  ${garamond("s19")};
  line-height: 1.35em;
  text-align: left;
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: ${space(3)}px;

  p {
    margin: 0;
  }

  ${pMedia.xs`
    ${garamond("s17")}
    line-height: 1.35em;
  `};
`
