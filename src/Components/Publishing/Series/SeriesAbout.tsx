import React, { Component } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled, { StyledFunction } from "styled-components"
import { media } from "../../Helpers"
import { Fonts } from "../Fonts"
import { PartnerBlock, PartnerBlockContainer } from "../Partner/PartnerBlock"
import { Text } from "../Sections/Text"

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
    const sponsorLogo = sponsor && (color === "black" ? sponsor.partner_dark_logo : sponsor.partner_light_logo)

    return (
      <SeriesAboutContainer color={color}>
        <StyledCol xs={12} sm={4}>
          <Title>About the Series</Title>
          {sponsor &&
            <PartnerBlock
              logo={sponsorLogo}
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
            ? <Text layout='standard' color={color}>{editDescription}</Text>
            : <Text layout='standard' color={color} html={series_description} />
          }
          {sponsor &&
            <PartnerBlock
              logo={sponsorLogo}
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

const Div: StyledFunction<Props & ColProps & React.HTMLProps<HTMLDivElement>> = styled(Row)
export const SeriesAboutContainer = Div`
  color: ${props => props.color};
  max-width: 1200px;
`
const StyledCol = styled(Col) `
  ${PartnerBlockContainer} {
    display: none;
  }

  &:first-of-type {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    ${PartnerBlockContainer} {
      display: block;
      margin-bottom: 10px;
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
  ${Fonts.unica("s32")}
  ${props => media.sm`
    margin-bottom: 20px;
  `}
`
