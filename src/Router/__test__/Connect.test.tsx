import { mount } from "enzyme"
import React from "react"
import { Boot } from "../Boot"
import { Connect } from "../Connect"
import { AppState } from "../state"

describe("Connect", () => {
  it("injects state from connected StateContainer", done => {
    mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <Connect to={AppState}>
          {({ initialMatchingMediaQueries }) => {
            expect(initialMatchingMediaQueries[0]).toBe("xs")
            done()
            return <div />
          }}
        </Connect>
      </Boot>
    )
  })
})
