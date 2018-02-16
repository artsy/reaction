import React from "react"
import styled from "styled-components"
import Events from "../../../Utils/Events"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"

interface Props {
  logo: string
  url: string
  tracking?: any
  trackingData?: any
}

@track(
  props => {
    return props.trackingData ? props.trackingData : {}
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PartnerBlock extends React.Component<Props, null> {
  static defaultProps = {
    tracking: {
      trackEvent: x => x,
    },
  }

  constructor(props) {
    super(props)
    this.onPartnerClick = this.onPartnerClick.bind(this)
  }

  onPartnerClick(event) {
    this.props.tracking.trackEvent({
      action: "Click",
    })
  }

  render() {
    const { logo, url } = this.props
    return (
      <PartnerBlockContainer className="PartnerBlock">
        <Title>Presented in Partnership with</Title>
        <a href={url} target="_blank" onClick={this.onPartnerClick}>
          <img src={logo} />
        </a>
      </PartnerBlockContainer>
    )
  }
}

export const PartnerBlockContainer = styled.div`
  img {
    max-width: 220px;
  }
  ${pMedia.sm`
    img {
      max-width: 195px;
    }
  `};
`
const Title = styled.div`
  ${Fonts.unica("s16", "medium")};
  margin-bottom: 20px;

  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
  `};
`
