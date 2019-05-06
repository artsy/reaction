import { userHasLabFeature } from "../getUser"

describe("getUser", () => {
  describe("userHasLabFeature", () => {
    it("returns true when user has specified lab feature", () => {
      const featureName = "my feature"
      const user: User = {
        lab_features: [featureName],
      }

      const result = userHasLabFeature(user, featureName)

      expect(result).toEqual(true)
    })

    it("returns false when user doesn't exist", () => {
      const featureName = "my feature"

      const result = userHasLabFeature(null, featureName)

      expect(result).toEqual(false)
    })

    it("returns false when user doesn't have lab_features", () => {
      const featureName = "my feature"
      const user: User = {}

      const result = userHasLabFeature(user, featureName)

      expect(result).toEqual(false)
    })

    it("returns false when user has other lab features", () => {
      const user: User = {
        lab_features: ["other feature"],
      }

      const result = userHasLabFeature(user, "original feature")

      expect(result).toEqual(false)
    })
  })
})
