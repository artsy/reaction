import React from 'react'
import styled from 'styled-components'
import Events from "../../../Utils/Events"
import track from "../../../Utils/track"
import { pMedia } from '../../Helpers'
import Icon from '../../Icon'
import { IconPlus } from '../Icon/IconPlus'

interface Props {
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
  render() {
    const { logo, url } = this.props 

    return (
      <PartnerInlineContainer className='PartnerInline'>
        <a href='/'>
          <Icon
            name="logotype"
            color="black"
            fontSize="32px"
          />
        </a>
        {logo && <IconPlus margin="0 0 0 10px" />}
        {logo &&
          <a href={url} target='_blank'>
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
    margin-left 10px;
    vertical-align: middle;
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
  `}
`
