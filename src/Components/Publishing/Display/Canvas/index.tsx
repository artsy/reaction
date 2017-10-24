import React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../../Assets/Colors"
import { track } from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"
import { Fonts } from "../../Fonts"
import { CanvasContainer } from "./CanvasContainer"

interface DisplayCanvasProps {
  unit: any
  campaign: any
}

@track()
export class DisplayCanvas extends React.Component<DisplayCanvasProps, any> {
  @track(props => ({
    action: "Click",
    label: "Display ad carousel arrow",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "canvas_slideshow"
  }))
  // tslint:disable-next-line:no-empty
  componentDidMount() { }

  render() {
    const { unit, campaign } = this.props
    const disclaimer = <Disclaimer layout={unit.layout}>{unit.disclaimer}</Disclaimer>

    return (
      <DisplayContainer layout={unit.layout}>
        <a href={unit.link.url} target="_blank">
          <AdvertisementBy>{`Advertisement by ${campaign.name}`}</AdvertisementBy>
        </a>
        <CanvasContainer unit={unit} campaign={campaign} disclaimer={disclaimer} />
        {unit.layout === "overlay" && disclaimer}
      </DisplayContainer>
    )
  }
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  layout: string
}

const Div: StyledFunction<DivProps> = styled.div

const DisplayContainer = Div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => (props.layout === "slideshow" ? "100%;" : "1250px;")}
  margin: 0 auto;
  margin-bottom: -44px; // Offset default force margin; FIXME: This kind of stuff needs to be globally addressed
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  ${props => pMedia.sm`
    ${props.layout !== "slideshow" && "padding: 0 20px;"}
    margin-bottom: 0;
  `}
`
const AdvertisementBy = styled.div`
  ${Fonts.avantgarde("s11")}
  color: ${Colors.grayMedium};
  margin: 10px 0;
  text-align: center;
`
const Disclaimer = Div`
  ${Fonts.garamond("s11")}
  color: ${Colors.grayMedium};
  margin: 15px 0 0 0;
  ${props => props.layout === "overlay" && "text-align: center;"}
  ${pMedia.sm`
    margin: 35px 0 10px 0;
  `}
`
