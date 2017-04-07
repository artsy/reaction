import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Button from "components/buttons/inverted"
import Artwork from "components/inquiry_artwork"
import Nav from "components/nav"
import NavItem from "components/nav_item"
import Text from "components/text"
import TextArea from "components/text_area"
import Title from "components/title"

const InquiryContainer = styled.div`
  display: inline-block;
`

const Container = styled.div`
  text-align: center;

  & .artworks {
    padding: 20px 0;
  }

  & .footer {
    max-width: 500;
    margin: 10px auto;
  }
`

const Header = styled.header`
  margin-top: 40px;
`

class Inquiries extends React.Component<RelayProps, any> {
  renderArtworks() {
    if (!this.props.user) {
      return []
    }

    const edges = this.props.user.artwork_inquiries_connection.edges || []
    return edges.map(edge => {
      // TODO: swap id with __id
      const { id, artwork } = edge.node
      return (
        <InquiryContainer key={id}>
          <Artwork artwork={artwork as any} />
        </InquiryContainer>
      )
    })
  }

  render() {
    return (
      <Container>
        <Nav>
          <NavItem href="/">Back To Artsy</NavItem>
        </Nav>
        <Header>
          <Title>Please select all works your purchased</Title>
        </Header>
        <div className="artworks">
          {this.renderArtworks()}
        </div>
        <footer className="footer">
          <Text textSize="large">If you purchased any works not included<br /> above, please list them.</Text>
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

interface RelayProps {
  user: {
    artwork_inquiries_connection: {
      edges: Array<{
        node: {
          id: string,
          artwork: Array<any | null> | null,
        } | null,
      } | null> | null,
    } | null,
  },
}
