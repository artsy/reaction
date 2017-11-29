import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { PartnerBlock, PartnerBlockContainer } from '../Partner/PartnerBlock'
import { Text } from '../Sections/Text'

interface Props {
  article?: any
  color?: string
}

export class SeriesAbout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { color, article } = this.props
    const { series, sponsor } = article

    return (
      <SeriesAboutContainer className='SeriesAbout' color={color}>

        <Col first>
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
        </Col>

        <Col>
          <Text layout='standard' html={series.description} />
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
        </Col>

      </SeriesAboutContainer>
    )
  }
}

SeriesAbout.defaultProps = {
  color: 'black'
}

interface ColProps {
  first: boolean
}

const Div: StyledFunction<Props & ColProps & React.HTMLProps<HTMLDivElement>> = styled.div

export const SeriesAboutContainer = Div`
  color: ${props => props.color};
  display: flex;
  justify-content: space-between;

  .article__text-section {
    min-width: 100%;
  }
  ${props => pMedia.md`
    display: block;
  `}
`

const Col = Div`
  width: ${props => props.first ? '30' : '60'}%;
  ${props => props.first && `
      display: flex;
      justify-content: space-between;
      flex-direction: column;
  `}

  ${PartnerBlockContainer} {
    ${props => !props.first && "display: none;"}
  }

  ${props => pMedia.md`
    width: 100%;

    ${PartnerBlockContainer} {
      margin-top: 60px;
      display: ${props.first ? "none" : "block"};
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica("s32", "medium")}
  ${props => pMedia.md`
    margin-bottom: 20px;
  `}
`
