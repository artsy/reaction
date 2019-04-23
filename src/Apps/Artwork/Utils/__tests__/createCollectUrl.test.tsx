jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://staging.artsy.net",
  },
}))

describe("createCollectUrl", () => {
  it("formats the collect page url correctly (large)", async () => {
    const result = createCollectUrl({
      minCents: 440000,
      maxCents: 445500,
      category: "Painting",
      widthCm: 76.2,
      heightCm: 101.6,
      artistId: "evelyn-walg",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/painting?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&height=28-%2A&width=28-%2A&price_range=4400-4455&artist_id=evelyn-walg"`
    )
  })
  it("formats the collect page url correctly (medium)", async () => {
    const result = createCollectUrl({
      minCents: 440000,
      maxCents: 445500,
      category: "Video/Film/Animation",
      widthCm: 60.3,
      heightCm: 70,
      artistId: "evelyn-walg",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/film-slash-video?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&height=16-28&width=16-28&price_range=4400-4455&artist_id=evelyn-walg"`
    )
  })

  it("formats the collect page url correctly (small)", async () => {
    const result = createCollectUrl({
      minCents: 440000,
      maxCents: 445500,
      category: "Drawing, Collage or other Work on Paper",
      widthCm: 30,
      heightCm: 23,
      artistId: "banksy",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/work-on-paper?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&height=0-16&width=0-16&price_range=4400-4455&artist_id=banksy"`
    )
  })

  it("doesn't specify category in some cases", () => {
    const result = createCollectUrl({
      minCents: 440000,
      maxCents: 445500,
      category: "Sound",
      widthCm: 30,
      heightCm: 23,
      artistId: "banksy",
    })
    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&height=0-16&width=0-16&price_range=4400-4455&artist_id=banksy"`
    )
  })
})
