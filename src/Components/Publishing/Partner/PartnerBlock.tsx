import { unica } from "Assets/Fonts"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import Events from "../../../Utils/Events"
import { pMedia } from "../../Helpers"

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
    const image = <img src={logo} />

    return (
      <PartnerBlockContainer className="PartnerBlock">
        {logo && <Title>Presented in Partnership with</Title>}
        {image && (
          <ImageContainer>
            {url ? (
              <a href={url} target="_blank" onClick={this.onPartnerClick}>
                {image}
              </a>
            ) : (
              image
            )}
          </ImageContainer>
        )}
      </PartnerBlockContainer>
    )
  }
}

export const PartnerBlockContainer = styled.div`
  display: block;
`

export const ImageContainer = styled.div`
  img {
    max-width: 240px;
    max-height: 40px;
    object-fit: contain;
    object-position: left;
  }
`

const Title = styled.div`
  ${unica("s16", "medium")};
  margin-bottom: 20px;

  ${pMedia.sm`
    ${unica("s14", "medium")}
  `};
`
