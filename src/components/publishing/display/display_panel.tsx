import * as _ from "lodash"
import React from "react"
import styled from "styled-components"
import Colors from "../../../assets/colors"
import { crop } from "../../../utils/resizer"
import Fonts from "../fonts"

interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  campaign: any
}

const DisplayPanel: React.SFC<DisplayPanelProps> = props => {
  const { unit, campaign } = props
  return (
    <DisplayPanelContainer>
      <Image src={unit.image_url} />
      <Headline>{unit.headline}</Headline>
      <Body dangerouslySetInnerHTML={{ __html: unit.body }} />
      <SponsoredBy>{`Sponsored by ${campaign.name}`}</SponsoredBy>
    </DisplayPanelContainer>
  )
}

const DisplayPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.grayRegular};
  padding: 20px;
  width: 360px;
`
const Image = styled.img`
  display: block;
  margin-bottom: 15px;
  height: 142px;
  object-fit: cover;
`
const Headline = styled.div`
  ${Fonts.unica("s16", "medium")}
  line-height: 1.23em;
  margin-bottom: 3px;
`
const Body = styled.div`
  ${Fonts.garamond("s15")}
  line-height: 1.53em;
  margin-bottom: 30px;
  a {
    color: black;
  }
`
const SponsoredBy = styled.div`
  ${Fonts.avantgarde("s11")}
  color: ${Colors.grayRegular};
`

export default DisplayPanel
