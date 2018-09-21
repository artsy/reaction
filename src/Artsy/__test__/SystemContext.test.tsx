import { render } from "enzyme"
import React from "react"

import {
  ContextConsumer,
  ContextProps,
  ContextProvider,
  withContext,
} from "Artsy"

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
  let text = props.user ? props.user.id : "no-current-user"
  if (props.additionalProp) {
    text = `${text} & ${props.additionalProp}`
  }
  return <div>{text}</div>
}
// This HOC adds the context to the component.
const WithCurrentUser = withContext(ShowCurrentUser)

const ShowRelayEnvironment: React.SFC<ContextProps> = props => {
  const mockedEnv: any = props.relayEnvironment
  return <div>{mockedEnv.description}</div>
}
const WithRelayEnvironment = withContext(ShowRelayEnvironment)

describe("Artsy context", () => {
  const user = {
    id: "andy-warhol",
    accessToken: "secret",
  }

  it("injects default renderProps", done => {
    render(
      <ContextProvider>
        <ContextConsumer>
          {props => {
            expect(Object.keys(props).sort()).toEqual([
              "relayEnvironment",
              "user",
            ])
            setImmediate(done)
            return <div />
          }}
        </ContextConsumer>
      </ContextProvider>
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
        <ContextProvider user={user}>
          <WithCurrentUser />
        </ContextProvider>
      )
      expect(wrapper.text()).toEqual("andy-warhol")
    })

    it("defaults to environment variables if available", () => {
      const wrapper = render(
        <ContextProvider>
          <WithCurrentUser />
        </ContextProvider>
      )
      expect(wrapper.text()).toEqual("user-id-from-env")
    })

    it("does not default to environment variables when explicitly passing null", () => {
      const wrapper = render(
        <ContextProvider user={null}>
          <WithCurrentUser />
        </ContextProvider>
      )
      expect(wrapper.text()).toEqual("no-current-user")
    })
  })

  it("creates and exposes a Relay environment", () => {
    const wrapper = render(
      <ContextProvider user={user}>
        <WithRelayEnvironment />
      </ContextProvider>
    )
    expect(wrapper.text()).toEqual("A mocked env for andy-warhol")
  })

  it("exposes a passed in Relay environment", () => {
    const mockedEnv: any = { description: "A passed in mocked env" }
    const wrapper = render(
      <ContextProvider user={user} relayEnvironment={mockedEnv}>
        <WithRelayEnvironment />
      </ContextProvider>
    )
    expect(wrapper.text()).toEqual("A passed in mocked env")
  })

  it("passes other props on", () => {
    const wrapper = render(
      <ContextProvider user={user}>
        <WithCurrentUser additionalProp="friends" />
      </ContextProvider>
    )
    expect(wrapper.text()).toEqual("andy-warhol & friends")
  })
})
