import {
  Box,
  Button,
  color,
  Flex,
  Input,
  Serif,
  TextArea,
} from "@artsy/palette"
import { SendFeedbackSearchResultsMutation } from "__generated__/SendFeedbackSearchResultsMutation.graphql"
import { ContextProps } from "Artsy"
import { withContext } from "Artsy/SystemContext"
import React from "react"
import { commitMutation, graphql } from "react-relay"

interface State {
  submitted: boolean
  message: string
  name: string
  email: string
}

class SendFeedbackForm extends React.Component<ContextProps, State> {
  state = {
    submitted: false,
    message: null,
    name: null,
    email: null,
  }

  handleClick() {
    const { user, relayEnvironment } = this.props
    const { message, name, email } = this.state
    if (!message) return
    if (!user && !name && !email) return

    commitMutation<SendFeedbackSearchResultsMutation>(relayEnvironment, {
      mutation: graphql`
        mutation SendFeedbackSearchResultsMutation(
          $input: SendFeedbackMutationInput!
        ) {
          sendFeedback(input: $input) {
            feedbackOrError {
              ... on SendFeedbackMutationSuccess {
                feedback {
                  message
                }
              }
              ... on SendFeedbackMutationFailure {
                mutationError {
                  type
                  message
                  detail
                }
              }
            }
          }
        }
      `,
      variables: {
        input: { message, email, name },
      },
      optimisticUpdater: () => {
        this.setState({
          submitted: true,
        })
      },
    })
  }

  renderPersonalInfoInputs() {
    return (
      <Flex mt={2} width="484px">
        <Box width="237px" mr={1}>
          <Input
            placeholder="Your name"
            onChange={({ currentTarget: { value: name } }) => {
              this.setState({ name })
            }}
          />
        </Box>
        <Box width="237px">
          <Input
            placeholder="Email address"
            onChange={({ currentTarget: { value: email } }) => {
              this.setState({ email })
            }}
          />
        </Box>
      </Flex>
    )
  }

  renderFeedbackTextArea() {
    return (
      <Box mt={2} width="484px">
        <TextArea
          onChange={({ value: message }) => {
            this.setState({ message })
          }}
          placeholder="Your comments here"
        />
      </Box>
    )
  }

  render() {
    const { user } = this.props

    return (
      <Box bg={color("black5")} p={3} mt={3}>
        <Flex
          style={{ minHeight: "212px" }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Box textAlign="center">
            <Serif size="4">Your feedback is important to us.</Serif>
          </Box>
          <Box>
            <Serif size="2">
              Tell us how we can improve and help you find what you are looking
              for.
            </Serif>
          </Box>
          {!user ? this.renderPersonalInfoInputs() : null}
          {this.renderFeedbackTextArea()}
          <Button
            onClick={() => {
              this.handleClick()
            }}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    )
  }
}

export const SendFeedback = withContext(SendFeedbackForm)
