import { createCollectUrl } from "../createCollectUrl"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "test-url",
  },
}))

describe("createCollectUrl", () => {
  it("formats the collect page url correctly", async () => {
    const result = createCollectUrl(
      440000,
      445500,
      "Painting",
      76.2,
      101.6,
      "evelyn-walg"
    )

    expect(result).toEqual(
      "test-url/collect/painting?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&price_range=4400-4455&height=28-*&width=28-*&artist_id=evelyn-walg"
    )
  })
})
