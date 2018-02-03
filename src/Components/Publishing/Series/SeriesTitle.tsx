import React, { Component } from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { PartnerBlock, PartnerBlockContainer } from '../Partner/PartnerBlock'

interface Props extends React.HTMLProps<HTMLDivElement> {
  article?: any
  color?: string
  editTitle?: any
}

export class SeriesTitle extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render() {
    const { article, color, editTitle } = this.props
    const { sponsor, title } = article

    return (
      <SeriesTitleContainer className='SeriesTitle' color={color}>

        <Title>
          {editTitle ? editTitle : title}
        </Title>

        {sponsor &&
          <PartnerBlock
            logo={sponsor.partner_light_logo}
            url={sponsor.partner_logo_link}
            trackingData={{
              type: 'external link',
              destination_path: sponsor.partner_logo_link
            }}
          />
        }

      </SeriesTitleContainer>
    )
  }
}

SeriesTitle.defaultProps = {
  color: 'black'
}

export const SeriesTitleContainer = styled.div`
  color: ${(props: Props) => props.color};
  text-align: center;

  ${PartnerBlockContainer} img {
    max-width: 240px;
    padding-top: 5px;
    padding-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }

  ${pMedia.md`
    ${PartnerBlockContainer} img {
      padding-bottom: 0;
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica("s120")}
  margin-bottom: 30px;

  ${pMedia.md`
    ${Fonts.unica("s65")}
    margin-bottom: 20px;
  `}
`
