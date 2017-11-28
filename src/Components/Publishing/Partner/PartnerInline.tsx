import React from 'react'
import styled from 'styled-components'
import Events from "../../../Utils/Events"
import track from "../../../Utils/track"
import { pMedia } from '../../Helpers'
import Icon from '../../Icon'
import { IconPlus } from '../Icon/IconPlus'

interface Props {
  color?: string
  logo: string
  url: string
  tracking?: any
  trackingData?: any
}

@track((props) => {
  return props.trackingData ? props.trackingData : {}
}, {
  dispatch: data => Events.postEvent(data)
})
export class PartnerInline extends React.Component<Props, null> {
  static defaultProps = {
    tracking: {
      trackEvent: x => x
    }
  }

  constructor(props) {
    super(props)
    this.onPartnerClick = this.onPartnerClick.bind(this)
  }

  onPartnerClick(event) {
    this.props.tracking.trackEvent({
      action: "Click"
    })
  }

  render() {
    const { color, logo, url } = this.props

    return (
      <PartnerInlineContainer className='PartnerInline'>
        <a href='/'>
          <Icon
            name="logo"
            color={color ? color : "black"}
            fontSize="32px"
          />
        </a>
        {logo && <IconPlus color={color} />}
        {logo &&
          <a
            href={url}
            target='_blank'
            onClick={this.onPartnerClick}
          >
            <img src={logo} />
          </a>
        }
      </PartnerInlineContainer>
    )
  }
}

const PartnerInlineContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    max-height: 32px;
    vertical-align: middle;
  }
  ${Icon} {
    margin: 0;
    vertical-align: middle;
  }
  .IconPlus {
    margin: 0 20px;
  }
  ${pMedia.sm`
    img {
      max-height: 24px;
    }
    ${Icon} {
      font-size: 24px;
    }
    .IconPlus {
      margin: 0 15px;
    }
  `}
`
