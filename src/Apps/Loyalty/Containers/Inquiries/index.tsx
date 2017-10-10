import * as React from "react"
import * as Relay from "react-relay"
import styled, { ThemeProvider } from "styled-components"

import theme from "../../../../assets/theme"
import { Col, Grid, Row } from "../../../../components/grid"
import { media } from "../../../../components/helpers"

import Button from "../../../../components/buttons/inverted"
import Artwork from "../../../../components/inquiry_artwork"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import Text from "../../../../components/text"
import TextArea from "../../../../components/text_area"
import Title from "../../../../components/title"

import * as Artsy from "../../../../components/artsy"

import UpdateCollectorProfileMutation from "./mutations/update_collector_profile"
import UpdateConversationMutation from "./mutations/update_conversation"

const InquiryContainer = styled.div`
  margin-bottom: 60px;
  width: 100%;
`

const Container = styled.div`
  text-align: center;
  width: 100%;

  & .artworks {
    margin: 30px 0;
  }

  & .footer {
    max-width: 500;
    margin: 10px auto;

    ${media.sm`
      margin: 20px 1.5rem 60px;
    `}
  }
`

const Header = styled.header`
  margin-top: 40px;

  & .header-title {
    margin-bottom: 0;
  }

  & .header-subtitle {
    margin-top: 5px;

    ${media.sm`
      margin-top: 10px;
      line-height: 23px;
    `}
  }

  ${media.sm`
    margin: 20px 3rem;
  `}
`

const LargeTextArea = styled(TextArea)`
  width: 100%;
  height: 130px;
`

export interface Props extends RelayProps, Artsy.ContextProps {}

interface SelectedConversation {
  id: string
  inquiry_id: string
}

export interface State {
  loyalty_applicant: boolean
  self_reported_purchases: string | null
  selected_conversations: SelectedConversation[]
}

export class Inquiries extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      loyalty_applicant: true,
      self_reported_purchases: null,
      selected_conversations: [],
    }
  }

  renderArtworks() {
    if (!this.props.user) {
      return []
    }

    const edges = this.props.user.artwork_inquiries_connection.edges || []
    return edges.map(edge => {
      const { id, artwork, impulse_conversation_id } = edge.node
      if (!impulse_conversation_id) {
        return null
      }
      return (
        <Col md={3} xs={6} key={id}>
          <InquiryContainer>
            <Artwork artwork={artwork} onSelect={this.onArtworkSelected.bind(this, impulse_conversation_id, id)} />
          </InquiryContainer>
        </Col>
      )
    })
  }

  onArtworkSelected(conversationId: string, inquiryId: string, selected: boolean) {
    const selectedConversation = {
      id: conversationId,
      inquiry_id: inquiryId,
    }

    const selectedConversations = selected
      ? this.state.selected_conversations.concat([selectedConversation])
      : this.state.selected_conversations.filter(val => val.id !== conversationId)

    this.setState({
      selected_conversations: selectedConversations,
    })
  }

  onTextboxChange(e: React.FormEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value.trim()
    this.setState({ self_reported_purchases: value.length > 0 ? value : null })
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
          this.trackSuccessfulSubmission()
          window.location.href = "/loyalty/thank-you?recent_applicant=true"
        }
      },
    })
  }

  submitInquiriesUpdate() {
    const ids = this.state.selected_conversations.map(value => value.id)

    const mutation = new UpdateConversationMutation({
      input: {
        ids,
        buyerOutcome: "PURCHASED",
      },
    })

    Relay.Store.commitUpdate(mutation, {
      onFailure: this.onSubmitUpdatesFailed,
      onSuccess: response => {
        this.submitCollectorProfileUpdate()
      },
    })
  }

  onSubmitUpdatesFailed(transaction) {
    console.error(transaction.getError())
    alert("Sorry, there was an error with your submission, please try again")
  }

  trackSuccessfulSubmission() {
    const ids = this.state.selected_conversations.map(value => value.id)

    const props = {
      user_id: this.props.currentUser.id,
      impulse_conversation_ids: ids,
      additional_response: this.state.self_reported_purchases,
      purchase_count: ids.length,
    }

    window.analytics.track("Submitted loyalty purchases", props)
  }

  enableSubmitButton() {
    const { selected_conversations, self_reported_purchases } = this.state
    return !!self_reported_purchases || selected_conversations.length > 0
  }

  render() {
    return (
      <Container>
        <Nav logoLink="/">
          <NavItem href="/">Back To Artsy</NavItem>
        </Nav>
        <Header>
          <Title titleSize="large" className="header-title">Please select all works you purchased</Title>
          <Text align="center" className="header-subtitle">
            We will confirm submitted purchases with the galleries
            in order to qualify you for the program membership.
          </Text>
        </Header>
        <div className="artworks">
          <ThemeProvider theme={theme as object}>
            <Grid>
              <Row>{this.renderArtworks()}</Row>
            </Grid>
          </ThemeProvider>
        </div>
        <footer className="footer">
          <Text align="center" textSize="large">
            If you purchased any works not included<br /> above, please list them.
          </Text>
          <LargeTextArea onChange={this.onTextboxChange.bind(this)} block placeholder="Artwork, Artist, Gallery" />
          <Button disabled={!this.enableSubmitButton()} onClick={this.onButtonClick.bind(this)} block>
            Submit purchases
          </Button>
        </footer>
      </Container>
    )
  }
}

export default Relay.createContainer(Artsy.ContextConsumer(Inquiries), {
  fragments: {
    user: () => Relay.QL`
      fragment on Me {
        artwork_inquiries_connection(first: 10) {
          edges {
            node {
              id
              impulse_conversation_id
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
          id: string | null
          impulse_conversation_id: string | null
          artwork: any
        } | null
      } | null> | null
    } | null
  }
}
