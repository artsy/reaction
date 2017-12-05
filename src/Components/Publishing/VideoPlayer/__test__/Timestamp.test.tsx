import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Timestamp } from "../Timestamp"

describe("Timestamp", () => {
  it("matches the snapshot", () => {
    const timestamp = renderer.create(
      <Timestamp
        duration={5000}
        currentTime={2000}
      />
    ).toJSON()
    expect(timestamp).toMatchSnapshot()
  })

  it("#formatTime - formats single digit seconds and minutes", () => {
    const timestamp = mount(
      <Timestamp
        duration={0}
        currentTime={0}
      />
    )
    expect(timestamp.text()).toMatch("00:00 / 00:00")
  })

  it("#formatTime - formats double digit seconds and minutes", () => {
    const timestamp = mount(
      <Timestamp
        duration={5601}
        currentTime={1000}
      />
    )
    expect(timestamp.text()).toMatch("16:40 / 33:21")
  })

  it("#formatTime - formats single digit seconds and minutes", () => {
    const timestamp = mount(
      <Timestamp
        duration={301}
        currentTime={242}
      />
    )
    expect(timestamp.text()).toMatch("04:02 / 05:01")
  })
})
