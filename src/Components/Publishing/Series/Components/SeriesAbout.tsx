import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../../Helpers"
import { Fonts } from "../../Fonts"
import { PartnerBlock } from '../../Partner/PartnerBlock'
import { Text } from '../../Sections/Text'

interface Props {
  color?: string,
  series?: any
}

export class SeriesAbout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { series } = this.props
    const { about, sponsor } = series

    return (
      <SeriesAboutContainer className='SeriesAbout'>

          <div className="col col--first">
            <Title>About the Series</Title>
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
          </div>

          <div className="col col--last">
            <Text layout='standard' html={about} />
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
          </div>

      </SeriesAboutContainer>
    )
  }
}

SeriesAbout.defaultProps = {
  color: 'black'
}

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

const SeriesAboutContainer = Div`
  color: ${props => props.color};
  display: flex;
  justify-content: space-between;

  .col {
    padding: 0;
    &--first {
      width: 30%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .PartnerBlock {
        display: block;
      }
    }
    &--last {
      width: 60%;
      .PartnerBlock {
        display: none;
      }
    }
  }

  .article__text-section {
    min-width: 100%;
  }

  ${props => pMedia.md`
    display: block;

    .col {
      width: 100%;
      &--first .PartnerBlock {
        display: none;
      }
      &--last .PartnerBlock {
        display: block;
        margin-top: 60px;
      }
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica("s32", "medium")}
  ${props => pMedia.md`
    margin-bottom: 20px;
  `}
`
