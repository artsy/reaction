import * as React from "react"
import * as Relay from "react-relay"

export class Artwork extends React.Component<null, null> {
  render() {
    return <div>Hello World</div>
  }
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        title
        date
        sale_message
        is_in_auction
        image {
          url(version: "large")
          aspect_ratio
        }
        artists {
          name
        }
        partner {
          name
        }
        href
      }
    `
  },
})
