import { unica } from "Assets/Fonts"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { ImageContainer, PartnerBlock } from "../Partner/PartnerBlock"

interface SeriesTitleProps extends React.HTMLProps<HTMLDivElement> {
  article?: ArticleData
  color?: string
  editTitle?: any
}

export const SeriesTitle: React.SFC<SeriesTitleProps> = ({
  article,
  color = "black",
  editTitle,
}) => {
  const { sponsor, title } = article

  return (
    <SeriesTitleContainer color={color}>
      <Title>{editTitle ? editTitle : title}</Title>

      {sponsor && (
        <PartnerBlock
          logo={sponsor.partner_light_logo}
          url={sponsor.partner_logo_link}
          trackingData={{
            type: "external link",
            destination_path: sponsor.partner_logo_link,
          }}
        />
      )}
    </SeriesTitleContainer>
  )
}

export const SeriesTitleContainer = styled.div<{ color: string }>`
  color: ${props => props.color};
  text-align: center;

  ${ImageContainer} {
    padding-top: 5px;
    padding-bottom: 40px;

    img {
      margin-left: auto;
      margin-right: auto;
    }
  }

  ${pMedia.md`
    ${ImageContainer} {
      padding-bottom: 0;
    }
  `};
`

const Title = styled.div`
  ${unica("s120")};
  margin-bottom: 30px;

  ${pMedia.md`
    ${unica("s65")}
    margin-bottom: 20px;
  `};
`
