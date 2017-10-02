import React from "react"
import styled from "styled-components"
import { track } from "../../../utils/track"
import Icon from "../../icon"

interface ShareProps extends React.HTMLProps<HTMLDivElement> {
  url: string
  title: string
}

@track()
class Share extends React.Component<ShareProps, null> {
  constructor(props) {
    super(props)
    this.getHref = this.getHref.bind(this)
    this.trackShare = this.trackShare.bind(this)
  }

  @track(props => ({ action: "share article", url: props.url }))
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
          <Icon name="facebook" color="black" fontSize="30px" />
        </IconWrapper>
        <IconWrapper href={this.getHref("twitter")} target="_blank" onClick={this.trackShare}>
          <Icon name="twitter" color="black" fontSize="30px" />
        </IconWrapper>
        <IconWrapper href={this.getHref("email")} onClick={this.trackShare}>
          <Icon name="mail" color="black" fontSize="30px" />
        </IconWrapper>
      </ShareContainer>
    )
  }
}

const ShareContainer = styled.div`
  display: flex;
`

const IconWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: baseline;
  text-decoration: none;
  color: black;
`
export default Share
