import * as Sentry from "@sentry/browser"
import { ErrorWithMetadata, reportError } from "Utils/errors"

jest.mock("@sentry/browser")

describe("errors", () => {
  describe("#reportError", () => {
    const scope = { setExtra: jest.fn() }
    const err = new Error("some error")
    const errWithMetadata = new ErrorWithMetadata("some message", {
      foo: "bar",
    })
    it("does not call setExtra on scope if the error has no metadata", () => {
      scope.setExtra.mockReset()
      reportError(err)(scope)
      expect(scope.setExtra).not.toBeCalled()
    })
    it("calls setExtra on scope for errors with metadata", () => {
      reportError(errWithMetadata)(scope)
      expect(scope.setExtra).toBeCalledWith("foo", "bar")
    })
    it("sends the error to Sentry", () => {
      reportError(errWithMetadata)(scope)
      expect(Sentry.captureException).toBeCalledWith(err)
    })
  })
})
