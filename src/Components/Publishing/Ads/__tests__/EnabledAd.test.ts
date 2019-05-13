import { isHTLAdEnabled } from "Components/Publishing/Ads/EnabledAd"
import { data as sd } from "sharify"

jest.mock("sharify", () => ({
  data: {
    HASHTAG_LAB_ADS_ALLOWLIST: "alloweduser@email.com,alloweduser2@email.com",
    CURRENT_USER: {
      type: "Non-Admin",
      email: "someuser@email.com",
    },
  },
}))

describe("enabled ads feature flag", () => {
  it("checks for allowlisted users", () => {
    const allowedUser = sd.HASHTAG_LAB_ADS_ALLOWLIST.split(",").filter(Boolean)

    expect(allowedUser).toHaveLength(2)
    expect(allowedUser).toEqual([
      "alloweduser@email.com",
      "alloweduser2@email.com",
    ])
  })

  it("checks for enabled ads", () => {
    expect(isHTLAdEnabled()).toBe(false)
  })
})
