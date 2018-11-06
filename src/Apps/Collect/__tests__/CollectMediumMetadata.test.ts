import { getMetadataForMedium } from "../CollectMediumMetadata"

describe("CollectMediumMetadata", () => {
  //

  it("returns the correct title and description for photography medium", () => {
    const metadata = getMetadataForMedium("photography")

    expect(metadata.title).toBe("Photography for Sale | Collect on Artsy")
    expect(metadata.description).toBe(
      "Buy, bid, and inquire on over 140,000 photographs on Artsy, the world’s largest online marketplace for art and design."
    )
  })

  it("returns the default title and description when there is no medium", () => {
    const metadata = getMetadataForMedium("")

    expect(metadata.title).toBe("Collect | Artsy")
    expect(metadata.description).toBe(
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
    )
  })
})
