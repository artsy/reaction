import React from "react"
import renderer from "react-test-renderer"

import "jest-styled-components"

jest.mock("../../Relay/createEnvironment", () => ({
  createEnvironment: (user: User) => ({ description: `A mocked env for ${user.name}` }),
}))

import * as Artsy from "../Artsy"

const ShowCurrentUser: React.SFC<Artsy.ContextProps & { additionalProp?: string }> = props => {
  let text = props.currentUser.name
  if (props.additionalProp) {
    text = `${text} & ${props.additionalProp}`
  }
  return <div>{text}</div>
}
// This HOC adds the context to the component.
const WithCurrentUser = Artsy.ContextConsumer(ShowCurrentUser)

const ShowRelayEnvironment: React.SFC<Artsy.ContextProps> = props => {
  const mockedEnv: any = props.relayEnvironment
  return <div>{mockedEnv.description}</div>
}
const WithRelayEnvironment = Artsy.ContextConsumer(ShowRelayEnvironment)

describe("Artsy context", () => {
  const currentUser: User = {
    id: "andy-warhol",
    accessToken: "secret",
    name: "Andy Warhol",
  }

  it("exposes the currently signed-in user", () => {
    const div = renderer
      .create(
        <Artsy.ContextProvider currentUser={currentUser}>
          <WithCurrentUser />
        </Artsy.ContextProvider>
      )
      .toJSON()
    expect(div.children[0]).toEqual("Andy Warhol")
  })

  it("creates and exposes a Relay environment", () => {
    const div = renderer
      .create(
        <Artsy.ContextProvider currentUser={currentUser}>
          <WithRelayEnvironment />
        </Artsy.ContextProvider>
      )
      .toJSON()
    expect(div.children[0]).toEqual("A mocked env for Andy Warhol")
  })

  it("exposes a passed in Relay environment", () => {
    const mockedEnv: any = { description: "A passed in mocked env" }
    const div = renderer
      .create(
        <Artsy.ContextProvider currentUser={currentUser} relayEnvironment={mockedEnv}>
          <WithRelayEnvironment />
        </Artsy.ContextProvider>
      )
      .toJSON()
    expect(div.children[0]).toEqual("A passed in mocked env")
  })

  it("passes other props on", () => {
    const div = renderer
      .create(
        <Artsy.ContextProvider currentUser={currentUser}>
          <WithCurrentUser additionalProp="friends" />
        </Artsy.ContextProvider>
      )
      .toJSON()
    expect(div.children[0]).toEqual("Andy Warhol & friends")
  })

  it("throws an error when not embedded in a context provider", () => {
    expect(() => {
      renderer.create(<WithCurrentUser />)
    }).toThrowErrorMatchingSnapshot()
  })

  it("throws an error when trying to embed more than a single child in a context provider", () => {
    expect(() => {
      renderer.create(
        <Artsy.ContextProvider>
          <WithCurrentUser />
          <div />
        </Artsy.ContextProvider>
      )
    }).toThrowErrorMatchingSnapshot()
  })

  it("has a display name for React DevTools purposes", () => {
    expect(WithCurrentUser.displayName).toEqual("Artsy(ShowCurrentUser)")
  })
})
