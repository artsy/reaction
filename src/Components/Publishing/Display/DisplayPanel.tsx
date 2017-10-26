import { once } from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../Assets/Colors"
import { crop, resize } from "../../../Utils/resizer"
import { track } from "../../../Utils/track"
import { Fonts } from "../Fonts"

interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  campaign: any
}

interface DivUrlProps extends React.HTMLProps<HTMLDivElement> {
  imageUrl: string
  hoverImageUrl: string
}

@track()
export class DisplayPanel extends React.Component<DisplayPanelProps, null> {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
  }

  @track(once(props => ({
    action: "Impression",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  })))
  // tslint:disable-next-line:no-empty
  componentDidMount() { }

  // Rather than using an <a /> tag, which bad markup can oftentimes break during
  // SSR, use JS to open link.
  @track((props, [e]) => ({
    action: "Click",
    label: "Display ad clickthrough",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  openLink(e) {
    e.preventDefault()
    window.open(e.currentTarget.attributes.href.value, '_blank')
  }

  render() {
    const { unit, campaign } = this.props
    const image = unit.assets[0] ? unit.assets[0].url : ""
    return (
      <Wrapper href={unit.link.url} onClick={this.openLink}>
        <DisplayPanelContainer
          imageUrl={crop(image, { width: 680, height: 284 })}
          hoverImageUrl={resize(unit.logo, { width: 680 })}
        >
          <Image />
          <Headline>{unit.headline}</Headline>
          <Body dangerouslySetInnerHTML={{ __html: unit.body }} />
          <SponsoredBy>{`Sponsored by ${campaign.name}`}</SponsoredBy>
        </DisplayPanelContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-top: 50px;
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
  ${Fonts.garamond("s17")} line-height: 1.53em;
  margin-bottom: 20px;
  a {
    color: black;
  }
`

const SponsoredBy = styled.div`
  ${Fonts.avantgarde("s11")} color: ${Colors.grayRegular};
`
