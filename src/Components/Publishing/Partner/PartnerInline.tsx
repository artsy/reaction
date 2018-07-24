import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import Events from "../../../Utils/Events"
import { pMedia } from "../../Helpers"
import Icon from "../../Icon"
import { IconPlus } from "../Icon/IconPlus"

interface Props {
  color?: string
  logo: string
  url: string
  tracking?: any
  trackingData?: any
  margin?: string
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  margin: string
}

@track(
  props => {
    return props.trackingData ? props.trackingData : {}
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PartnerInline extends React.Component<Props, null> {
  static defaultProps = {
    tracking: {
      trackEvent: x => x,
    },
    margin: "0px",
  }

  onPartnerClick = event => {
    this.props.tracking.trackEvent({
      action: "Click",
      type: "external_link",
      destination_path: event.currentTarget.href,
    })
  }

  render() {
    const { color, logo, url, margin } = this.props

    return (
      <PartnerInlineContainer margin={margin} className="PartnerInline">
        <a href="/">
          <Icon name="logo" color={color ? color : "black"} fontSize="32px" />
        </a>
        {logo && <IconPlus color={color} />}
        {logo && (
          <a href={url} target="_blank" onClick={this.onPartnerClick}>
            <img src={logo} />
          </a>
        )}
      </PartnerInlineContainer>
    )
  }
}

const PartnerInlineContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props: DivProps) => props.margin};
  img {
    max-height: 24px;
    vertical-align: middle;
    -ms-interpolation-mode: bicubic;
  }
  ${IconPlus} {
    margin: 0 20px;
  }
  ${Icon} {
    margin: 0;
    vertical-align: middle;
  }
  ${pMedia.sm`
    img {
      max-height: 24px;
    }
    ${Icon} {
      font-size: 24px;
    }
    ${IconPlus} {
      margin: 0 10px;
    }
  `};
`
