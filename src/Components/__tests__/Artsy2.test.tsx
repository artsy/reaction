import * as Artsy from "Artsy/SystemContext"
import { render } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { ContextProps } from "../Artsy"

jest.mock("../../Artsy/Relay/createEnvironment", () => ({
  createEnvironment: config => ({
    description: `A mocked env for ${
      config.user ? config.user.id : "no-current-user"
    }`,
  }),
}))

const ShowCurrentUser: React.SFC<
  ContextProps & { additionalProp?: string }
> = props => {
  let text = props.currentUser ? props.currentUser.id : "no-current-user"
  if (props.additionalProp) {
    text = `${text} & ${props.additionalProp}`
  }
  return <div>{text}</div>
}
// This HOC adds the context to the component.
const WithCurrentUser = Artsy.withContext(ShowCurrentUser)

const ShowRelayEnvironment: React.SFC<ContextProps> = props => {
  const mockedEnv: any = props.relayEnvironment
  return <div>{mockedEnv.description}</div>
}
const WithRelayEnvironment = Artsy.withContext(ShowRelayEnvironment)

describe("Artsy context", () => {
  const currentUser = {
    id: "andy-warhol",
    accessToken: "secret",
  }

  it("injects default renderProps", done => {
    render(
      <Artsy.ContextProvider>
        <Artsy.ContextConsumer>
          {props => {
            expect(Object.keys(props).sort()).toEqual([
              "currentUser",
              "relayEnvironment",
            ])
            done()
            return <div />
          }}
        </Artsy.ContextConsumer>
      </Artsy.ContextProvider>
    )
  })

  describe("concerning the current user", () => {
    let originalEnv = null

    beforeAll(() => {
      originalEnv = process.env
      process.env = Object.assign({}, originalEnv, {
        USER_ID: "user-id-from-env",
        USER_ACCESS_TOKEN: "user-access-token-from-env",
      })
    })

    afterAll(() => {
      process.env = originalEnv
    })

    it("exposes the currently signed-in user", () => {
      const wrapper = render(
        <Artsy.ContextProvider currentUser={currentUser}>
          <WithCurrentUser />
        </Artsy.ContextProvider>
      )
      expect(wrapper.text()).toEqual("andy-warhol")
    })

    it("defaults to environment variables if available", () => {
      const wrapper = render(
        <Artsy.ContextProvider>
          <WithCurrentUser />
        </Artsy.ContextProvider>
      )
      expect(wrapper.text()).toEqual("user-id-from-env")
    })

    it("does not default to environment variables when explicitly passing null", () => {
      let wrapper = render(
        <Artsy.ContextProvider currentUser={null}>
          <WithCurrentUser />
        </Artsy.ContextProvider>
      )
      expect(wrapper.text()).toEqual("no-current-user")
    })
  })

  it("creates and exposes a Relay environment", () => {
    const wrapper = render(
      <Artsy.ContextProvider currentUser={currentUser}>
        <WithRelayEnvironment />
      </Artsy.ContextProvider>
    )
    expect(wrapper.text()).toEqual("A mocked env for andy-warhol")
  })

  it("exposes a passed in Relay environment", () => {
    const mockedEnv: any = { description: "A passed in mocked env" }
    const wrapper = render(
      <Artsy.ContextProvider
        currentUser={currentUser}
        relayEnvironment={mockedEnv}
      >
        <WithRelayEnvironment />
      </Artsy.ContextProvider>
    )
    expect(wrapper.text()).toEqual("A passed in mocked env")
  })

  it("passes other props on", () => {
    const wrapper = render(
      <Artsy.ContextProvider currentUser={currentUser}>
        <WithCurrentUser additionalProp="friends" />
      </Artsy.ContextProvider>
    )
    expect(wrapper.text()).toEqual("andy-warhol & friends")
  })

  // it("throws an error when not embedded in a context provider", () => {
  //   global.console.error = jest.fn()
  //   expect(() => {
  //     render(<WithCurrentUser />)
  //   }).toThrowError()
  // })
})
