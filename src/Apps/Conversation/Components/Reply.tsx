import { Box, Button, color, Flex, media, TextArea } from "@artsy/palette"
import { Conversation_conversation } from "__generated__/Conversation_conversation.graphql"
import React, { useEffect, useRef, useState } from "react"
import { Environment } from "react-relay"
import styled from "styled-components"
import { SendConversationMessage } from "../Mutation/SendConversationMessage"

const StyledFlex = styled(Flex)`
  border-top: 1px solid ${color("black10")};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
`

const FullWidthFlex = styled(Flex)<{ height?: string }>`
  div {
    width: 100%;
    height: ${({ height }) => height};
    min-height: 40px;
  }
`

const StyledTextArea = styled.textarea<{ height?: string }>`
  border: none;
  width: 100%;
  height: ${({ height }) => height};
  max-height: calc(60vh - 145px);
  resize: none;
  min-height: 40px;
  font-size: 16px;
  ${media.xs`
    max-height: calc(60vh - 115px);
  `};
`
const StyledButton = styled(Button)``

interface ReplyProps {
  conversation: Conversation_conversation
  environment: Environment
}

export const Reply: React.FC<ReplyProps> = props => {
  const { environment, conversation } = props
  const [bodyText, setBodyText] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const textArea = useRef()
  // const textAreaDisabled =
  //   textArea.current === undefined || textArea.current.state.value === ""
  // const textAreaHeight =
  //   textArea.current === undefined || !textArea.current.state.value.length
  //     ? "40px"
  //     : "auto"
  // let textAreaDisabled = true

  // console.log("JGYGHJhgjhjg", textArea)
  // if (textArea.current !== undefined) {
  //   console.log("JGYGHJhgjhjg", textArea.current)
  // }
  /* const height = large ? calc(60vh - 145px) : calc(60vh - 115px) */
  return (
    <StyledFlex p={1}>
      <FullWidthFlex width="100%">
        <StyledTextArea
          onInput={event => {
            // Reset field height
            const field = event.target as HTMLTextAreaElement
            field.style.height = "inherit"
            if (buttonDisabled && field.value.length > 2) {
              setButtonDisabled(false)
            }
            if (!buttonDisabled && field.value.length <= 2) {
              setButtonDisabled(true)
            }

            // console.log("wooooo", textAreaDisabled)

            // Get the computed styles for the element
            const computed = window.getComputedStyle(field)

            // Calculate the height
            const height = field.scrollHeight
            // parseInt(computed.getPropertyValue("border-top-width"), 10) +
            // parseInt(computed.getPropertyValue("padding-top"), 10) +
            // field.scrollHeight +
            // parseInt(computed.getPropertyValue("padding-bottom"), 10) +
            // parseInt(computed.getPropertyValue("border-bottom-width"), 10)

            console.log("COMPUTED height", height)

            field.style.height = height + "px"
          }}
          placeholder="Type your message"
          ref={textArea}
          onChange={event => {
            setBodyText(event.target.value)
          }}
        />
      </FullWidthFlex>
      <Flex alignItems="flex-end">
        <StyledButton
          disabled={buttonDisabled}
          onClick={_event =>
            SendConversationMessage(
              environment,
              conversation,
              bodyText,
              _response => {
                setBodyText(null)
              },
              _error => {
                setBodyText(null)
              }
            )
          }
        >
          Send
        </StyledButton>
      </Flex>
    </StyledFlex>
  )
}
