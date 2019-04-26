import { createCollectUrl } from "../createCollectUrl"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://staging.artsy.net",
  },
}))

describe("createCollectUrl", () => {
  it("formats the collect page url correctly (large)", async () => {
    const result = createCollectUrl({
      category: "Painting",
      sizeScore: 5000,
      artistId: "evelyn-walg",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/painting?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=4900-%2A&artist_id=evelyn-walg"`
    )
  })
  it("formats the collect page url correctly (medium)", async () => {
    const result = createCollectUrl({
      category: "Video/Film/Animation",
      sizeScore: 2000,
      artistId: "evelyn-walg",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/film-slash-video?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=1600-4900&artist_id=evelyn-walg"`
    )
  })

  it("formats the collect page url correctly (small)", async () => {
    const result = createCollectUrl({
      category: "Drawing, Collage or other Work on Paper",
      sizeScore: 1000,
      artistId: "banksy",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/drawing?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=0-1600&artist_id=banksy"`
    )
  })

  it("doesn't specify category in some cases", () => {
    const result = createCollectUrl({
      category: "Sound",
      sizeScore: 1000,
      artistId: "banksy",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=0-1600&artist_id=banksy"`
    )
  })
})
