import { Box, Button, color, Flex, Serif, TextArea } from "@artsy/palette"
import { SendFeedbackSearchResultsMutation } from "__generated__/SendFeedbackSearchResultsMutation.graphql"
import { ContextProps } from "Artsy"
import { withContext } from "Artsy/SystemContext"
import React from "react"
import { commitMutation, graphql } from "react-relay"

interface State {
  submitted: boolean
  message: string
}

class SendFeedbackForm extends React.Component<ContextProps, State> {
  state = {
    submitted: false,
    message: null,
  }

  handleClick() {
    const { user, relayEnvironment } = this.props
    const { message } = this.state
    if (!message) return
    if (user && user.id) {
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
          input: { message },
        },
        optimisticUpdater: () => {
          this.setState({
            submitted: true,
          })
        },
      })
    }
  }

  render() {
    return (
      <Box bg={color("black5")} p={3} mt={3}>
        <Flex
          height="212px"
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
          <Box mt={2} width="484px">
            <TextArea
              onChange={({ value: message }) => {
                this.setState({ message })
              }}
              placeholder="Your comments here"
            />
          </Box>
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
