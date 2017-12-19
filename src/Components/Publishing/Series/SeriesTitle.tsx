import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { PartnerBlock, PartnerBlockContainer } from '../Partner/PartnerBlock'

interface Props {
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

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

export const SeriesTitleContainer = Div`
  color: ${props => props.color};
  text-align: center;

  ${PartnerBlockContainer} img {
    max-width: 170px;
    padding-top: 5px;
    padding-bottom: 40px;
  }

  ${props => pMedia.md`
    ${PartnerBlockContainer} img {
      max-width: 200px;
      padding-bottom: 0;
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica("s120")}
  margin-bottom: 30px;

  ${props => pMedia.md`
    ${Fonts.unica("s65")}
    margin-bottom: 20px;
  `}
`
