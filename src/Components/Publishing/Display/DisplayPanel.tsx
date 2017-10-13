import React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../Assets/Colors"
import { crop, resize } from "../../../Utils/resizer"
import { Fonts } from "../Fonts"

interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  campaign: any
}
interface DivUrlProps extends React.HTMLProps<HTMLDivElement> {
  imageUrl: string
  hoverImageUrl: string
}

export const DisplayPanel: React.SFC<DisplayPanelProps> = props => {
  const { unit, campaign } = props
  const image = unit.assets[0] ? unit.assets[0].url : ""
  return (
    <LinkWrapper href={unit.link.url}>
      <DisplayPanelContainer
        imageUrl={crop(image, { width: 680, height: 284 })}
        hoverImageUrl={resize(unit.logo, { width: 680 })}
      >
        <Image />
        <Headline>{unit.headline}</Headline>
        <Body dangerouslySetInnerHTML={{ __html: unit.body }} />
        <SponsoredBy>{`Sponsored by ${campaign.name}`}</SponsoredBy>
      </DisplayPanelContainer>
    </LinkWrapper>
  )
}

const LinkWrapper = styled.a`
  text-decoration: none;
  color: black;
`
const Image = styled.div`
  margin-bottom: 15px;
  width: 100%;
  height: 142px;
  background-color: black;
  box-sizing: border-box;
`
const Div: StyledFunction<DivUrlProps> = styled.div
const DisplayPanelContainer = Div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.grayRegular};
  padding: 20px;
  max-width: 360px;
  box-sizing: border-box;
  ${Image} {
    background: url(${props => (props.imageUrl ? props.imageUrl : "")}) no-repeat center center;
    background-size: cover;
  }
  &:hover {
    ${Image} {
      ${props =>
        props.hoverImageUrl
          ? `
          background: black url(${props.hoverImageUrl}) no-repeat center center;
          background-size: contain;
          border: 10px solid black;
        `
          : ""}
    }
  }
`
const Headline = styled.div`
  ${Fonts.unica("s16", "medium")} line-height: 1.23em;
  margin-bottom: 3px;
`
const Body = styled.div`
  ${Fonts.garamond("s15")} line-height: 1.53em;
  margin-bottom: 30px;
  a {
    color: black;
  }
`
const SponsoredBy = styled.div`
  ${Fonts.avantgarde("s11")} color: ${Colors.grayRegular};
`
