import React from "react"

interface SocialEmbedProps {
  section: any
}

interface SocialEmbedState {
  html: string
}

export class SocialEmbed extends React.Component<
  SocialEmbedProps,
  SocialEmbedState
> {
  state = { html: "" }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        html: "WHAT UP!",
      })
    }, 3000)
  }

  getEmbedType = () => {
    const { url } = this.props.section

    if (url.match("twitter")) {
      return "twitter"
    } else if (url.match("instagram")) {
      return "instagram"
    }
  }

  render() {
    if (this.state.html) {
      return this.state.html
    } else {
      return <div>Loading...</div>
    }
  }
}
