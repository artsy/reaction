import { ErrorBoundary } from "Components/ErrorBoundary"
import { mount } from "enzyme"
import React from "react"

jest.mock("Components/NavBar", () => ({
  NavBar: () => <div />,
}))

describe("ErrorBoundary", () => {
  const errorLog = console.error

  beforeEach(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = errorLog
  })

  it("renders children if no error", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>found child</div>
      </ErrorBoundary>
    )

    expect(wrapper.text()).toContain("found child")
  })

  it("calls componentDidCatch if error", () => {
    jest.spyOn(ErrorBoundary.prototype, "componentDidCatch")
    const ErrorComponent = () => {
      throw new Error("throw error")
      return null
    }
    expect(() => {
      mount(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      )
      expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled()
    }).toThrow()
  })

  it("shows error modal when asyncChunkLoadError is true", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <div>erroneous render</div>
      </ErrorBoundary>
    )

    wrapper.setState({
      asyncChunkLoadError: true,
    })

    wrapper.update()
    expect(wrapper.text()).not.toContain("erroneous render")
    expect(wrapper.find("ErrorModalWithReload").length).toEqual(1)
  })

  it("it only shows ErrorModalWithReload if error is related to failed chunks", () => {
    expect(
      ErrorBoundary.getDerivedStateFromError({
        message: "generic error",
      })
    ).toEqual(undefined)
    expect(
      ErrorBoundary.getDerivedStateFromError({
        message: "Loading chunk c3495.js failed",
      })
    ).toEqual({
      asyncChunkLoadError: true,
    })
  })
})
