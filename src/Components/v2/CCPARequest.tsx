import { Box, Button, Flex, Input, Modal, Sans, TextArea } from "@artsy/palette"
import React, { useState } from "react"
import styled from "styled-components"
import { get } from "Utils/get"

interface Props {
  user?: User
}

const FeedbackTextAreaContainer = styled(Box)`
  max-width: 484px;
  width: 100%;
`

const InputContainer = styled(Flex)`
  max-width: 484px;
  width: 100%;
`

const LoggedOutContents = ({ setName, setEmail, setText }) => {
  return (
    <>
      <Sans size="3">Your message</Sans>
      <FeedbackTextAreaContainer my={3}>
        <TextArea
          onChange={({ value }) => {
            setText(value)
          }}
          placeholder="Your comments here"
          required
        />
      </FeedbackTextAreaContainer>
      <InputContainer mt={2} alignContent="space-between">
        <Box mr={1} width="50%">
          <Input
            name="name"
            placeholder="Your name"
            onChange={({ currentTarget: { value } }) => {
              setName(value)
            }}
            required
          />
        </Box>
        <Box width="50%">
          <Input
            name="email"
            placeholder="Email address"
            onChange={({ currentTarget: { value } }) => {
              setEmail(value)
            }}
            required
          />
        </Box>
      </InputContainer>
    </>
  )
}

const LoggedInContents = ({ name, email, setText }) => {
  return (
    <>
      <InputContainer mt={2} alignContent="space-between">
        <Box mr={1} width="50%">
          Name: {name}
        </Box>
        <Box width="50%">Email: {email}</Box>
      </InputContainer>
      <Sans size="3">Your message</Sans>
      <FeedbackTextAreaContainer my={3}>
        <TextArea
          onChange={({ value }) => {
            setText(value)
          }}
          placeholder="Your comments here"
          required
        />
      </FeedbackTextAreaContainer>
    </>
  )
}

const SuccessScreen = ({ email, name, text }) => {
  return (
    <>
      Successfully sent message for:
      <Box>email: {email}</Box>
      <Box>name: {name}</Box>
      <Box>text: {text}</Box>
    </>
  )
}

export const CCPARequest: React.FC<Props> = props => {
  const { user } = props
  const [showModal, setShowModal] = useState(false)

  const [feedbackText, setFeedbackText] = useState(null)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const userEmail = get(props, p => p.user.email)
  const userName = get(props, p => p.user.name)

  const modalContents = submitted ? (
    <SuccessScreen
      text={feedbackText}
      email={userEmail || email}
      name={userName || name}
    />
  ) : !user ? (
    <LoggedOutContents
      setName={setName.bind(this)}
      setEmail={setEmail.bind(this)}
      setText={setFeedbackText.bind(this)}
    />
  ) : (
    <LoggedInContents
      name={userName}
      email={userEmail}
      setText={setFeedbackText.bind(this)}
    />
  )

  const modalButton = submitted ? (
    <Button onClick={() => setShowModal(false)}>Return</Button>
  ) : (
    <Button onClick={() => setSubmitted(true)}>Submit</Button>
  )

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Do not sell my personal information
      </Button>
      <Modal
        title="Personal Data Request"
        show={showModal}
        onClose={() => {
          setEmail(null)
          setName(null)
          setSubmitted(false)
          setFeedbackText(null)
          setShowModal(false)
        }}
        FixedButton={modalButton}
      >
        {modalContents}
      </Modal>
    </>
  )
}
