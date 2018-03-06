import jsonp from "jsonp"
import React from "react"
import EmbedContainer from "react-oembed-container"

interface SocialEmbedProps {
  section: any
}

interface SocialEmbedState {
  html: string
}

const TWITTER_EMBED_URL = "https://publish.twitter.com/oembed"
const INSTAGRAM_EMBED_URL = "https://api.instagram.com/oembed"

export class SocialEmbed extends React.Component<
  SocialEmbedProps,
  SocialEmbedState
> {
  state = { html: "", error: "" }

  componentDidMount() {
    jsonp(this.getEmbedUrl(), (err, data) => {
      if (err) {
        return
      }
      this.setState({ html: data.html })
    })
  }

  getEmbedUrl = () => {
    const { url } = this.props.section

    if (url.match("twitter")) {
      return TWITTER_EMBED_URL + `?url=${url}`
    } else if (url.match("insta")) {
      return INSTAGRAM_EMBED_URL + `?url=${url}`
    }
  }

  render() {
    const { html } = this.state

    if (html) {
      return (
        <EmbedContainer markup={html}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </EmbedContainer>
      )
    } else {
      return false
    }
  }
}
