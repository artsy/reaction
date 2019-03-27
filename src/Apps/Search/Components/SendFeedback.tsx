import {
  Box,
  Button,
  CheckCircleIcon,
  color,
  Flex,
  Input,
  Serif,
  TextArea,
} from "@artsy/palette"
import { SendFeedbackSearchResultsMutation } from "__generated__/SendFeedbackSearchResultsMutation.graphql"
import { ContextProps } from "Artsy"
import { withContext } from "Artsy/SystemContext"
import { EMAIL_REGEX } from "Components/Publishing/Constants"
import React from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"

interface Inputs {
  message: string
  name: string
  email: string
}

interface State extends Inputs {
  submitted: boolean
  triggeredValidation: boolean
}

const logger = createLogger("Apps/Search/Components/SendFeedback.tsx")

class SendFeedbackForm extends React.Component<ContextProps, State> {
  state = {
    submitted: false,
    message: "",
    name: "",
    email: "",
    triggeredValidation: false,
  }

  handleClick() {
    const { user, relayEnvironment } = this.props
    const { message, name, email } = this.state
    if (!message) return
    if (!user && !(name && email)) return

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
      // Add slight delay to make UX seem a bit nicer
      optimisticUpdater: () => {
        setTimeout(
          () =>
            this.setState({
              submitted: true,
            }),
          500
        )
      },
      onCompleted: data => {
        const {
          sendFeedback: { feedbackOrError },
        } = data
        if (feedbackOrError.mutationError) {
          logger.error(
            new ErrorWithMetadata(
              feedbackOrError.mutationError.type,
              feedbackOrError.mutationError.message
            )
          )
        } else {
          this.setState({
            submitted: true,
          })
        }
      },
    })
  }

  renderPersonalInfoInputs() {
    const { name, triggeredValidation } = this.state
    const errorForEmail = this.errorForEmail()
    return (
      <LoggedOutInputContainer mt={2} alignContent="space-between">
        <Box mr={1} width="50%">
          <Input
            placeholder="Your name"
            onChange={({ currentTarget: { value } }) => {
              this.setState({ name: value })
            }}
            required
            error={
              !name && triggeredValidation ? "Cannot leave field blank" : ""
            }
          />
        </Box>
        <Box width="50%">
          <Input
            placeholder="Email address"
            onChange={({ currentTarget: { value } }) => {
              this.setState({ email: value })
            }}
            required
            error={errorForEmail && triggeredValidation ? errorForEmail : ""}
          />
        </Box>
      </LoggedOutInputContainer>
    )
  }

  errorForEmail() {
    const { email } = this.state
    if (!email) return "Cannot leave field blank"
    if (!email.match(EMAIL_REGEX)) return "Invalid email."
  }

  renderFeedbackTextArea() {
    const { message, triggeredValidation } = this.state
    return (
      <FeedbackTextAreaContainer mt={2}>
        <TextArea
          onChange={({ value }) => {
            this.setState({ message: value })
          }}
          placeholder="Your comments here"
          required
          error={
            !message && triggeredValidation ? "Cannot leave field blank" : ""
          }
        />
      </FeedbackTextAreaContainer>
    )
  }

  renderSuccess() {
    return (
      <>
        <CheckCircleIcon />
        <Box mt={1} textAlign="center">
          <Serif size="4">Your message has been sent!</Serif>
        </Box>
        <Box>
          <Serif size="2">Thank you for helping to improve Artsy.</Serif>
        </Box>
      </>
    )
  }

  renderFeedbackForm() {
    const { user } = this.props
    return (
      <>
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
            this.setState({ triggeredValidation: true }, () =>
              this.handleClick()
            )
          }}
        >
          Submit
        </Button>
      </>
    )
  }

  render() {
    const { submitted } = this.state

    return (
      <Box bg={color("black5")} p={3} mt={3}>
        <FeedbackContainer
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          {submitted ? this.renderSuccess() : this.renderFeedbackForm()}
        </FeedbackContainer>
      </Box>
    )
  }
}

const FeedbackContainer = styled(Flex)`
  min-height: 212px;
`

const FeedbackTextAreaContainer = styled(Box)`
  max-width: 484px;
  width: 100%;
`

const LoggedOutInputContainer = styled(Flex)`
  max-width: 484px;
  width: 100%;
`

export const SendFeedback = withContext(SendFeedbackForm)
