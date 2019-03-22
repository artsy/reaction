import { Button } from "@artsy/palette"
import { SendFeedback } from "Apps/Search/Components/SendFeedback"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { Environment } from "relay-runtime"

const commitMutation = _commitMutation as jest.Mock<any>
const message = "cats are cool"
const successResponse = {
  sendFeedback: { feedbackOrError: { feedback: { message } } },
}

const simulateTyping = (component, value) => {
  const textArea = component.find("textarea")
  // @ts-ignore
  textArea.getDOMNode().value = value
  textArea.simulate("change")
}

describe("SendFeedback", () => {
  const user = { id: "blah" }
  const getWrapper = () => {
    return mount(
      <MockBoot>
        <SendFeedback user={user} relayEnvironment={{} as Environment} />
      </MockBoot>
    )
  }

  beforeEach(() => {
    commitMutation.mockReset()
  })

  it("prompts for feedback", () => {
    const component = getWrapper()
    expect(component.text()).toContain("Tell us how we can improve")
    expect(component.find("textarea")).toHaveLength(1)
  })

  it("does not call the mutation without a message", () => {
    const component = getWrapper()
    component.find(Button).simulate("click")
    component.update()

    expect(commitMutation).not.toHaveBeenCalled()
  })

  it("displays a thank-you after feedback is submitted", () => {
    const component = getWrapper()
    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(successResponse)
    })

    simulateTyping(component, message)
    component.find(Button).simulate("click")
    component.update()

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(component.text()).toContain("Your message has been sent")
  })
})
