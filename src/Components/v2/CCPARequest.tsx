import {
  Box,
  Button,
  CheckCircleIcon,
  Input,
  Link,
  Modal,
  Sans,
  Separator,
  Serif,
  TextArea,
} from "@artsy/palette"
import { CCPARequestMutation } from "__generated__/CCPARequestMutation.graphql"
import { useSystemContext } from "Artsy"
import React, { useState } from "react"
import { commitMutation, graphql } from "react-relay"
import styled from "styled-components"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import createLogger from "Utils/logger"

const logger = createLogger("Components/V2/CCPARequest.tsx")

interface Props {
  user?: User
}

const FeedbackTextAreaContainer = styled(Box)`
  max-width: 484px;
  width: 100%;
`

const IconContainer = styled(Box)`
  margin: auto;
`

const Feedback = ({ setText }) => {
  return (
    <>
      <Sans weight="medium" size="3">
        Your message
      </Sans>
      <FeedbackTextAreaContainer mt={1}>
        <TextArea
          onChange={({ value }) => {
            setText(value)
          }}
          placeholder="Describe your data request"
          required
        />
      </FeedbackTextAreaContainer>
    </>
  )
}

const LoggedOutContents = ({ setName, setEmail, setText }) => {
  return (
    <>
      <Header />

      <Feedback setText={setText} />

      <Box mt={1}>
        <Input
          name="name"
          placeholder="Your full name"
          onChange={({ currentTarget: { value } }) => {
            setName(value)
          }}
          required
        />
      </Box>
      <Box mt={1}>
        <Input
          name="email"
          placeholder="Your email address"
          onChange={({ currentTarget: { value } }) => {
            setEmail(value)
          }}
          required
        />
      </Box>
    </>
  )
}

const LoggedInContents = ({ email, setText }) => {
  return (
    <>
      <Header />
      <Separator mt={3} />

      <Box my={1}>
        <Serif size="3">From: {email}</Serif>
      </Box>

      <Separator mb={3} />
      <Feedback setText={setText} />
    </>
  )
}

const Header = () => {
  return (
    <Serif size="4" textAlign="center">
      Our{" "}
      <Link target="_blank" href="/privacy">
        Privacy Policy
      </Link>{" "}
      has the information we collect, how we use it, and why we use it.{"\n"}
      You can also email{" "}
      <Link href="mailto:privacy@artsy.net">privacy@artsy.net</Link> for more
      information or to submit a request.
    </Serif>
  )
}

const SuccessScreen = () => {
  return (
    <>
      <IconContainer>
        <CheckCircleIcon fill="green100" height="24" width="24" />
      </IconContainer>
      <Box mt={3} textAlign="center">
        <Serif size="3">We've received your message</Serif>
      </Box>
    </>
  )
}

const sendDataRequest = ({
  relayEnvironment,
  email,
  notes,
  name,
  setSubmitted,
}) => {
  commitMutation<CCPARequestMutation>(relayEnvironment, {
    mutation: graphql`
      mutation CCPARequestMutation($input: CreateAccountRequestMutationInput!) {
        createAccountRequest(input: $input) {
          accountRequestOrError {
            ... on CreateAccountRequestMutationSuccess {
              accountRequest {
                notes
              }
            }
            ... on CreateAccountRequestMutationFailure {
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
      input: { notes, email, name, action: "user_data" },
    },
    // Add slight delay to make UX seem a bit nicer
    optimisticUpdater: () => {
      setTimeout(() => setSubmitted(true), 500)
    },
    onCompleted: data => {
      const {
        createAccountRequest: { accountRequestOrError },
      } = data
      if (accountRequestOrError.mutationError) {
        logger.error(
          new ErrorWithMetadata(
            accountRequestOrError.mutationError.type,
            accountRequestOrError.mutationError.message
          )
        )
      } else {
        setSubmitted(true)
      }
    },
  })
}

export const CCPARequest: React.SFC<Props> = props => {
  const { user } = props
  const { relayEnvironment } = useSystemContext()
  const [showModal, setShowModal] = useState(false)

  const [notes, setNotes] = useState(null)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const userEmail = get(props, p => p.user.email)

  const modalContents = submitted ? (
    <SuccessScreen />
  ) : !user ? (
    <LoggedOutContents
      setName={setName.bind(this)}
      setEmail={setEmail.bind(this)}
      setText={setNotes.bind(this)}
    />
  ) : (
    <LoggedInContents email={userEmail} setText={setNotes.bind(this)} />
  )

  const modalButton = submitted ? (
    <Button width="100%" onClick={() => setShowModal(false)}>
      Return to Artsy
    </Button>
  ) : (
    <Button
      width="100%"
      onClick={() => {
        sendDataRequest({ relayEnvironment, email, name, notes, setSubmitted })
      }}
    >
      Send message
    </Button>
  )

  const onClose = () => {
    setEmail(null)
    setName(null)
    setSubmitted(false)
    setNotes(null)
    setShowModal(false)
  }

  const title = submitted ? "Message sent" : "Personal Data Request"

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Do not sell my personal information
      </Button>
      <Modal
        title={title}
        show={showModal}
        onClose={onClose}
        FixedButton={modalButton}
      >
        {modalContents}
      </Modal>
    </>
  )
}
