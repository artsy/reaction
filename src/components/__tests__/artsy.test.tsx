import * as React from "react"
import * as renderer from "react-test-renderer"

import * as Artsy from "../artsy"

const ShowCurrentUser: React.SFC<Artsy.ContextProps> = props => {
  return <div>{props.artsy.currentUser.id}</div>
}
// This HOC adds the context to the component.
const WithCurrentUser = Artsy.ContextConsumer(ShowCurrentUser)

describe("Artsy context", () => {
  it("exposes the currently signed-in user", () => {
    const currentUser: Artsy.CurrentUser = {
      id: "andy-warhol",
      accessToken: "secret",
    }
    const div = renderer.create(
      <Artsy.ContextProvider currentUser={currentUser}>
        <WithCurrentUser />
      </Artsy.ContextProvider>,
    ).toJSON()
    expect(div.children[0]).toEqual("andy-warhol")
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
        </Artsy.ContextProvider>,
      )
    }).toThrowErrorMatchingSnapshot()
  })

  it("has a display name for React DevTools purposes", () => {
    expect(WithCurrentUser.displayName).toEqual("Artsy(ShowCurrentUser)")
  })
})
