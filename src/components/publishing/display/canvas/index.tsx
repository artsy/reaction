import React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../../assets/colors"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"
import Canvas from "./container"

interface DisplayCanvasProps {
  unit: any
  campaign: any
}

const DisplayCanvas: React.SFC<DisplayCanvasProps> = props => {
  const { unit, campaign } = props
  const disclaimer = <Disclaimer layout={unit.layout}>{unit.disclaimer}</Disclaimer>

  return (
    <DisplayContainer layout={unit.layout}>
      <a href={unit.link.url} target="_blank">
        <AdvertisementBy>{`Advertisement by ${campaign.name}`}</AdvertisementBy>
      </a>
      <Canvas unit={unit} disclaimer={disclaimer} />
      {unit.layout === "overlay" && disclaimer}
    </DisplayContainer>
  )
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  layout: string
}

const Div: StyledFunction<DivProps> = styled.div

const DisplayContainer = Div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => (props.layout === "slideshow" ? "100%;" : "1200px;")});
  margin: 0 auto;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  ${props => pMedia.sm`
    ${props.layout !== "slideshow" && "padding: 0 20px;"}
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
  ${props => props.layout === "overlay" && "text-align: center;"})
  ${pMedia.sm`
    margin: 35px 0 10px 0;
  `}
`

export default DisplayCanvas
