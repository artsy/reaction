import { unica } from "Assets/Fonts"
import React, { Component } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { media } from "../../Helpers"
import { PartnerBlock, PartnerBlockContainer } from "../Partner/PartnerBlock"
import { Text } from "../Sections/Text"
import { ArticleData } from "../Typings"

interface Props {
  article?: ArticleData
  color?: string
  editDescription?: any
  editSubTitle?: any
  tracking?: TrackingProp
}

@track()
export class SeriesAbout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  componentDidMount() {
    const textLink = document.querySelector(".SeriesAbout__description a")
    if (textLink) {
      textLink.addEventListener("click", this.onClickFooterLink)
    }
  }

  onClickFooterLink = event => {
    this.props.tracking.trackEvent({
      action: "Click",
      flow: "Partner Footer CTA",
      type: "external_link",
      destination_path: event.currentTarget.href,
    })
  }

  render() {
    const {
      article: { series, sponsor },
      color,
      editDescription,
      editSubTitle,
    } = this.props

    const sponsorLogo =
      sponsor &&
      (color === "black"
        ? sponsor.partner_dark_logo
        : sponsor.partner_light_logo)

    return (
      <SeriesAboutContainer color={color}>
        <StyledCol xs={12} sm={4}>
          <Title>
            {editSubTitle
              ? editSubTitle
              : (series && series.sub_title) || "About the Series"}
          </Title>
          {sponsor && (
            <PartnerBlock
              logo={sponsorLogo}
              url={sponsor.partner_logo_link}
              trackingData={{
                type: "external link",
                destination_path: sponsor.partner_logo_link,
              }}
            />
          )}
        </StyledCol>
        <StyledCol xs={12} sm={8}>
          {editDescription ? (
            <Text layout="standard" color={color}>
              {editDescription}
            </Text>
          ) : (
            <div className="SeriesAbout__description">
              <Text
                layout="standard"
                color={color}
                html={series && series.description}
              />
            </div>
          )}
          {sponsor && (
            <PartnerBlock
              logo={sponsorLogo}
              url={sponsor.partner_logo_link}
              trackingData={{
                type: "external link",
                destination_path: sponsor.partner_logo_link,
              }}
            />
          )}
        </StyledCol>
      </SeriesAboutContainer>
    )
  }
}

SeriesAbout.defaultProps = {
  color: "black",
}

export const SeriesAboutContainer = styled(Row)`
  color: ${(props: Props) => props.color};
  max-width: 1200px;
  width: 100%;
`

const StyledCol = styled(Col)`
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
  `};
`

const Title = styled.div`
  ${unica("s32")};
  ${props => media.sm`
    margin-bottom: 20px;
  `};
`
