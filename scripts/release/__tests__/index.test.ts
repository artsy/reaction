import { ReleaseLabel, ReleaseLabelValue } from "../labels"

describe("release", () => {
  describe("labels", () => {
    it("should have a value for every label", () => {
      Object.values(ReleaseLabel).forEach(label =>
        expect(Object.keys(ReleaseLabelValue)).toContain(label)
      )
    })
  })
})
