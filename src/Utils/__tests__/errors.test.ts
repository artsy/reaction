import * as Sentry from "@sentry/browser"
import { ErrorWithMetadata, sendErrorToService } from "Utils/errors"

jest.mock("@sentry/browser")

describe("errors", () => {
  describe("#ErrorWithMetadata", () => {
    // todo
  })
  describe("#sendErrorToService", () => {
    describe("with an Error (without metadata)", () => {
      it("sends an error to Sentry", () => {
        sendErrorToService(new Error("msg"))
        expect(Sentry.withScope).toHaveBeenCalled()
      })
    })
    describe("with an ErrorWithMetadata", () => {
      it("sends an error to Sentry", () => {
        const errorMetadata = { someProp: "more error info" }
        sendErrorToService(new ErrorWithMetadata("msg", errorMetadata))
        expect(Sentry.withScope).toHaveBeenCalled()
      })
      it("sets metadata on Sentry scope", () => {
        // todo
      })
    })
  })
})
