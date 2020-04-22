import { systemContextReducer } from "../systemContextState"

describe("systemContextState", () => {
  describe("setAppMaxWidth", () => {
    it("sets width based upon breakpoint keys", () => {
      const state = systemContextReducer(
        {},
        { type: "setAppMaxWidth", payload: "md" }
      )
      expect(state.appMaxWidth).toEqual(900)
    })

    it("sets max width to 100%", () => {
      const state = systemContextReducer(
        {},
        { type: "setAppMaxWidth", payload: "100%" }
      )
      expect(state.appMaxWidth).toEqual("100%")
    })

    it("sets default max width to xl breakpoint if payload not passed", () => {
      const state = systemContextReducer({}, { type: "setAppMaxWidth" })
      expect(state.appMaxWidth).toEqual(1192)
    })
  })
})
