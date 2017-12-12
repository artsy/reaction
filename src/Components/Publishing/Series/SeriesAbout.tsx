import React, { Component } from "react"
import { Col } from "react-styled-flexboxgrid"
import styled, { StyledFunction } from "styled-components"
import { media } from "../../Helpers"
import { Fonts } from "../Fonts"
import { PartnerBlock, PartnerBlockContainer } from '../Partner/PartnerBlock'
import { Text } from '../Sections/Text'

interface Props {
  article?: any
  color?: string
  editDescription?: any
}

export class SeriesAbout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render() {
    const { article, color, editDescription } = this.props
    const { series_description, sponsor } = article

    return (
      <SeriesAboutContainer color={color}>
        <StyledCol xs={12} sm={4}>
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
        </StyledCol>
        <StyledCol xs={12} sm={8}>
          {editDescription
            ? <Text layout='standard'>{editDescription}</Text>
            : <Text layout='standard' html={series_description} />
          }
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
        </StyledCol>
      </SeriesAboutContainer>
    )
  }
}

SeriesAbout.defaultProps = {
  color: 'black'
}

interface ColProps {
  first?: boolean
}

const Div: StyledFunction<Props & ColProps & React.HTMLProps<HTMLDivElement>> = styled.div
export const SeriesAboutContainer = Div`
  color: ${props => props.color};
  max-width: 1200px;
  display: flex;
`
const StyledCol = styled(Col) `
  flex: 1;
  ${PartnerBlockContainer} {
    display: none;
  }

  &:first-of-type {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    ${PartnerBlockContainer} {
      display: block;
    }
  }

  ${props => media.sm`
    &:first-of-type {
      ${PartnerBlockContainer} {
        display: none;
      }
    }

    ${PartnerBlockContainer} {
      margin-top: 60px;
      display: block;
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica("s32", "medium")}
  ${props => media.sm`
    margin-bottom: 20px;
  `}
`
