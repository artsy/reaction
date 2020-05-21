import React from "react"
import { Banner, Sans } from "@artsy/palette"

interface Props {
  messageCode: string
}

const textMessage: (msg: string) => React.FC = (message: string) => () => (
  <Sans color="white100" size="3" lineHeight={1} weight="medium">
    {message}
  </Sans>
)

const messages: { [k: string]: React.FC } = {
  confirmed: textMessage("Your email has been confirmed."),
  // TODO: I don't think we should show this as a fallback as any string could trigger it
  fallback: textMessage("An error has occurred. Please try again."),
}

export const FlashBanner: React.FunctionComponent<Props> = ({
  messageCode,
}) => {
  const Message = messages[messageCode] || messages.fallback
  return (
    <Banner dismissable backgroundColor="black100">
      <Message />
    </Banner>
  )
}
