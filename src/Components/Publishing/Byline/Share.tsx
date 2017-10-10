import React from "react"
import styled from "styled-components"
import { track } from "../../../utils/track"
import IconSocialEmail from "../icon/social_email"
import IconSocialFacebook from "../icon/social_facebook"
import IconSocialTwitter from "../icon/social_twitter"

interface ShareProps extends React.HTMLProps<HTMLDivElement> {
  url: string
  title: string
  articleId?: string
  color?: string
}

@track()
class Share extends React.Component<ShareProps, null> {
  static defaultProps = {
    color: "black",
  }

  constructor(props) {
    super(props)
    this.getHref = this.getHref.bind(this)
    this.trackShare = this.trackShare.bind(this)
  }

  @track((props, [e]) => ({
    action: "Article share",
    article_id: props.articleId,
    context_type: "article_fixed",
    service: (() => {
      const href = e.currentTarget.attributes.href.value
      if (href.match("facebook")) return "facebook"
      if (href.match("twitter")) return "twitter"
      if (href.match("mailto")) return "email"
    })(),
  }))
  trackShare(e) {
    e.preventDefault()
    window.open(e.currentTarget.attributes.href.value, "Share", "width = 600,height = 300")
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
    return (
      <ShareContainer>
        <IconWrapper href={this.getHref("facebook")} target="_blank" onClick={this.trackShare}>
          <IconSocialFacebook color={this.props.color} />
        </IconWrapper>
        <IconWrapper href={this.getHref("twitter")} target="_blank" onClick={this.trackShare}>
          <IconSocialTwitter color={this.props.color} />
        </IconWrapper>
        <IconWrapper href={this.getHref("email")} onClick={this.trackShare}>
          <IconSocialEmail color={this.props.color} />
        </IconWrapper>
      </ShareContainer>
    )
  }
}

const ShareContainer = styled.div`
  display: flex;
  margin-top: 5px;
`
const IconWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: baseline;
  text-decoration: none;
  margin-right: 14px;
  &:hover {
    opacity: 0.6;
  }
`
export default Share
