import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Artwork from "../../../../components/artwork"
import Button from "../../../../components/buttons/inverted"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import TextArea from "../../../../components/text_area"
import Title from "../../../../components/title"

const InquiryContainer = styled.div`
  display: inline-block;
`

const Container = styled.div`
  text-align: center;

  & .footer {
    max-width: 500;
    margin: 10px auto;
  }
`

class Inquiries extends React.Component<RelayProps, any> {
  renderArtworks() {
    if (!this.props.user) {
      return []
    }

    const edges = this.props.user.artwork_inquiries_connection.edges || []
    return edges.map(edge => {
      const { __id, artwork } = edge.node
      return (
        <InquiryContainer>
          <Artwork key={__id} artwork={artwork as any} />
        </InquiryContainer>
      )
    })
  }

  render() {
    return (
      <Container>
        <Nav>
          <NavItem href="https://www.artsy.net">Back To Artsy</NavItem>
        </Nav>
        <Title>Please select all works your purchased</Title>
        <div className="artworks">
          {this.renderArtworks()}
        </div>
        <footer className="footer">
          <Title titleSize="small">If you purchased any works not listed above, please list them.</Title>
          <TextArea block placeholder="Artwork, Artist, Gallery" />
          <Button block>Submit purchases</Button>
        </footer>
      </Container>
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
              __id
              artwork {
                ${Artwork.getFragment("artwork")}
              }
            }
          }
        }
      }
    `,
  },
})

interface RelayProps {
  user: {
    artwork_inquiries_connection: {
      edges: Array<{
        node: {
          __id: string,
          artwork: Array<any | null> | null,
        } | null,
      } | null> | null,
    } | null,
  },
}
