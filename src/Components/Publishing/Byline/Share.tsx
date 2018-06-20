import { unica } from "Assets/Fonts"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import Events from "../../../Utils/Events"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { IconSocialEmail } from "../Icon/IconSocialEmail"
import { IconSocialFacebook } from "../Icon/IconSocialFacebook"
import { IconSocialTwitter } from "../Icon/IconSocialTwitter"

interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string
  title: string
  articleId?: string
  color?: string
  tracking?: any
  trackingData?: any
  hasLabel?: boolean
  isMobile?: boolean
  isNews?: boolean
}

@track(
  props => {
    return props.trackingData ? props.trackingData : {}
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class Share extends React.Component<Props, null> {
  static defaultProps = {
    color: "black",
    hasLabel: false,
  }

  constructor(props) {
    super(props)
    this.getHref = this.getHref.bind(this)
    this.trackShare = this.trackShare.bind(this)
  }

  trackShare(e) {
    e.preventDefault()
    window.open(
      e.currentTarget.attributes.href.value,
      "Share",
      "width = 600,height = 300"
    )

    this.props.tracking.trackEvent({
      action: "Click",
      type: "share",
      label: (() => {
        const href = e.currentTarget.attributes.href.value
        if (href.match("facebook")) return "facebook"
        if (href.match("twitter")) return "twitter"
        if (href.match("mailto")) return "email"
      })(),
    })
  }

  getHref(type) {
    const { url, title } = this.props
    const encodedUrl = encodeURIComponent(url)
    const channels = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?original_referer=${encodedUrl}&text=${title}&url=${encodedUrl}&via=artsy`,
      email: `mailto:?subject=${title}&body=Check out ${title} on Artsy: ${url}`,
    }
    return channels[type]
  }

  render() {
    const { color, hasLabel, isMobile, isNews } = this.props

    return (
      <ShareContainer removeMarginForMobile={isNews && isMobile}>
        {hasLabel && <ShareLabel>Share</ShareLabel>}
        <IconWrapper
          href={this.getHref("facebook")}
          target="_blank"
          onClick={this.trackShare}
        >
          <IconSocialFacebook color={color} />
        </IconWrapper>
        <IconWrapper
          href={this.getHref("twitter")}
          target="_blank"
          onClick={this.trackShare}
        >
          <IconSocialTwitter color={color} />
        </IconWrapper>
        <IconWrapper href={this.getHref("email")} onClick={this.trackShare}>
          <IconSocialEmail color={color} />
        </IconWrapper>
      </ShareContainer>
    )
  }
}

interface ShareContainerProps {
  removeMarginForMobile?: boolean
}

const div: StyledFunction<
  ShareContainerProps & React.HTMLProps<HTMLInputElement>
> =
  styled.div

export const ShareContainer = div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  line-height: 1em;
  ${props =>
    props.removeMarginForMobile
      ? ""
      : pMedia.xs`
    margin-top: 15px;
  `};
`
const IconWrapper = styled.a`
  text-decoration: none;
  padding-left: 7px;
  padding-right: 7px;
  &:hover {
    opacity: 0.6;
  }
  &:first-child {
    padding-left: 0;
  }
`
const ShareLabel = styled.span`
  ${unica("s16", "medium")};
  margin: 10px 10px 10px 0px;
`
