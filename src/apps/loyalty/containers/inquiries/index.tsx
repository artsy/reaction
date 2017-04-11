import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Button from "components/buttons/inverted"
import { Col, Row } from "components/grid"
import Artwork from "components/inquiry_artwork"
import Nav from "components/nav"
import NavItem from "components/nav_item"
import Text from "components/text"
import TextArea from "components/text_area"
import Title from "components/title"

import UpdateCollectorProfileMutation from "./mutations/update_collector_profile"
import UpdateConversationMutation from "./mutations/update_conversation"

const InquiryContainer = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`

const Container = styled.div`
  text-align: center;

  & .artworks {
    padding: 20px 0;
    max-width: 1024px;
    margin: 20px auto;
  }

  & .footer {
    max-width: 500;
    margin: 10px auto;
  }
`

const Header = styled.header`
  margin-top: 40px;

  & .header-title {
    margin-bottom: 0;
  }
`

export interface State {
  loyalty_applicant: boolean,
  self_reported_purchases?: string,
  selected_artworks?: {string?: boolean}
}

export class Inquiries extends React.Component<RelayProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      loyalty_applicant: true,
      selected_artworks: {},
    }
  }

  renderArtworks() {
    if (!this.props.user) {
      return []
    }

    const edges = this.props.user.artwork_inquiries_connection.edges || []
    return edges.map(edge => {
      const { id, artwork, impulse_conversation_id } = edge.node
      return (
        <Col>
          <InquiryContainer key={id}>
            <Artwork
              artwork={artwork as any}
              onSelect={this.onArtworkSelected.bind(this, impulse_conversation_id)}
            />
          </InquiryContainer>
        </Col>
      )
    })
  }

  onArtworkSelected(conversationId: string, selected: boolean) {
    const selectedArtworks = this.state.selected_artworks
    selectedArtworks[conversationId] = selected

    this.setState({
      selected_artworks: selectedArtworks,
    })
  }

  onTextboxChange(e) {
    this.setState({ self_reported_purchases: e.target.value })
  }

  onButtonClick(e) {
    e.preventDefault()
    this.submitInquiriesUpdate()
  }

  submitCollectorProfileUpdate() {
    const mutation = new UpdateCollectorProfileMutation(this.state)

    Relay.Store.commitUpdate(mutation, {
      onFailure: this.onSubmitUpdatesFailed,
      onSuccess: response => {
        if (response.updateCollectorProfile.loyalty_applicant_at) {
          window.location.pathname = "/loyalty/thank-you"
        }
      },
    })
  }

  submitInquiriesUpdate() {
    let ids: string[] = []
    const artworks = this.state.selected_artworks

    for (let artworkId of Object.keys(artworks)) {
      if (artworks[artworkId]) {
        ids.push(artworkId)
      }
    }

    const mutation = new UpdateConversationMutation({input: {
      ids,
      buyerOutcome: "PURCHASED",
    }})

    Relay.Store.commitUpdate(mutation, {
      onFailure: this.onSubmitUpdatesFailed,
      onSuccess: response => {
        this.submitCollectorProfileUpdate()
      },
    })
  }

  onSubmitUpdatesFailed(transaction) {
    console.log(transaction.getError()) // tslint:disable-line:no-console
  }

  render() {
    return (
      <Container>
        <Nav>
          <NavItem href="/">Back To Artsy</NavItem>
        </Nav>
        <Header>
          <Title titleSize="large" className="header-title">Please select all works you purchased</Title>
          <Text align="center">We will confirm submitted purchases with the galleries 
            in order to qualify you for the program membership.</Text>
        </Header>
        <div className="artworks">
          <Row>
          {this.renderArtworks()}
          </Row>
        </div>
        <footer className="footer">
          <Text align="center" textSize="large">
            If you purchased any works not included<br /> above, please list them.
          </Text>
          <TextArea onChange={this.onTextboxChange.bind(this)} block placeholder="Artwork, Artist, Gallery" />
          <Button onClick={this.onButtonClick.bind(this)} block>Submit purchases</Button>
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
              impulse_conversation_id
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
          id: string | null,
          impulse_conversation_id: string | null,
          artwork: Array<any | null> | null,
        } | null,
      } | null> | null,
    } | null,
  },
}
