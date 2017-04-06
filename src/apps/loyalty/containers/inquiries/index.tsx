import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Button from "../../../../components/buttons/inverted"
import Artwork from "../../../../components/inquiry_artwork"
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

interface State {
  loyalty_applicant: boolean,
  self_reported_purchases?: string
}

type RelayMutationProps = State

class UpdateCollectorProfileMutation extends Relay.Mutation<RelayMutationProps, any> {
  getMutation() {
    return Relay.QL `mutation {
      updateCollectorProfile
    }`
  }

  getVariables() {
    return {
      self_reported_purchases: this.props.self_reported_purchases,
      loyalty_applicant: this.props.loyalty_applicant,
    }
  }

  getFatQuery() {
    return Relay.QL `
    fragment on UpdateCollectorProfilePayload {
      loyalty_applicant_at
    }`
  }

  getConfigs() {
    return [{
      type: "REQUIRED_CHILDREN",
      children: [Relay.QL`
        fragment on UpdateCollectorProfilePayload {
          loyalty_applicant_at
        }`],
    }]
  }
}

class Inquiries extends React.Component<RelayProps, State> {
  constructor() {
    super()
    this.state = { loyalty_applicant: true }
  }

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

  handleTextboxChange(e) {
    this.setState({ self_reported_purchases: e.target.value })
  }

  handleClick(e) {
    e.preventDefault()

    const onSuccess = response => {
      if (!response.updateCollectorProfile.loyalty_applicant_at) {
        console.log("Loyalty Applicant Not Saved") // tslint:disable-line:no-console
      } else {
        console.log("Success") // tslint:disable-line:no-console
      }
    }

    const onFailure = transaction => {
      console.log(transaction.getError()) // tslint:disable-line:no-console
    }

    const mutation = new UpdateCollectorProfileMutation(this.state)

    Relay.Store.commitUpdate(
      mutation, {onFailure, onSuccess},
    )
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
          <TextArea onChange={this.handleTextboxChange.bind(this)} block placeholder="Artwork, Artist, Gallery" />
          <Button onClick={this.handleClick.bind(this)} block>Submit purchases</Button>
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
          id: string | null,
          artwork: Array<any | null> | null,
        } | null,
      } | null> | null,
    } | null,
  },
}
