import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../../Helpers"
import { Fonts } from "../../Fonts"
import { PartnerBlock } from '../../Partner/PartnerBlock'

interface Props {
  color?: string,
  series?: any
}

export class SeriesTitle extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { color, series } = this.props
    const { sponsor } = series

    return (
      <SeriesTitleContainer className='SeriesTitle' color={color}>

        <Title>{series.title}</Title>

        {sponsor &&
          <PartnerBlock
            logo={sponsor.partner_logo}
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

const SeriesTitleContainer = Div`
  color: ${props => props.color};
  text-align: center;

  .PartnerBlock img {
    max-width: 170px;
    padding-top: 5px;
  }

  ${props => pMedia.md`
    .PartnerBlock img {
      max-width: 200px;
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
