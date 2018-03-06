import jsonp from "jsonp"
import React from "react"
import EmbedContainer from "react-oembed-container"

interface SocialEmbedProps {
  section: any
}

interface SocialEmbedState {
  html: string
  error: string
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
        return this.setState({ error: "Failed to Load." })
      }

      this.setState({ html: data.html })
    })
  }

  getEmbedUrl = () => {
    const { url } = this.props.section

    if (url.match("twitter")) {
      return TWITTER_EMBED_URL + `?url=${encodeURIComponent(url)}`
    } else if (url.match("insta")) {
      return INSTAGRAM_EMBED_URL + `?url=${encodeURIComponent(url)}`
    }
  }

  render() {
    const { html, error } = this.state

    if (html) {
      return (
        <EmbedContainer markup={html}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </EmbedContainer>
      )
    } else if (error) {
      return <div>{error}</div>
    } else {
      return <div>Loading...</div>
    }
  }
}

const failed
