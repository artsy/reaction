import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import * as Artsy from "../artsy"

const ShowCurrentUser: React.SFC<Artsy.ContextProps & { additionalProp?: string }> = props => {
  let text = props.currentUser.name
  if (props.additionalProp) {
    text = `${text} & ${props.additionalProp}`
  }
  return <div>{text}</div>
}
// This HOC adds the context to the component.
const WithCurrentUser = Artsy.ContextConsumer(ShowCurrentUser)

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
