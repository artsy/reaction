import * as React from "react"
import * as Relay from "react-relay"

import Artwork from "../../../../components/artwork"
import Button from "../../../../components/buttons/inverted"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import TextArea from "../../../../components/text_area"
import Title from "../../../../components/title"

class Inquiries extends React.Component<any, any> {
  renderArtworks() {
    const edges = this.props.user.artwork_inquiries_connection.edges || []
    return edges.map(edge => {
      return (
        <div style={{width: "300px", maxHeight: "450px", display: "inline-block"}}>
          <Artwork artwork={edge.node.artwork} />
        </div>
      )
    })
  }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Nav>
          <NavItem href="https://www.artsy.net">Back To Artsy</NavItem>
        </Nav>
        <Title>Please select all works your purchased</Title>
        <div className="artworks">
          {this.renderArtworks()}
        </div>
        <footer style={{maxWidth: 500, margin: "10px auto"}}>
          <Title titleSize="small">If you purchased any works not listed above, please list them.</Title>
          <TextArea block placeholder="Artwork, Artist, Gallery" />
          <Button block>Submit purchases</Button>
        </footer>
      </div>
    )
  }
}

export default Relay.createContainer(Inquiries, {
  fragments: {
    user: () => Relay.QL`
      fragment on Me {
        artwork_inquiries_connection(first: 10) {
          edges {
            node {
              id
              artwork {
                ${(Artwork.getFragment("artwork"))}
              }
            }
          }
        }
      }
    `,
  },
})
