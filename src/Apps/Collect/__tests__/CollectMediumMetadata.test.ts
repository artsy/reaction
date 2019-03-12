import { getMetadataForMedium } from "../CollectMediumMetadata"

describe("CollectMediumMetadata", () => {
  //

  it("returns the correct title and description for photography medium", () => {
    const metadata = getMetadataForMedium("photography")

    expect(metadata.title).toBe("Photography - For Sale on Artsy")
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

  it("returns the correct title and description for design medium", () => {
    const metadata = getMetadataForMedium("design")

    expect(metadata.title).toBe("Design Works - For Sale on Artsy")
    expect(metadata.description).toBe(
      "Buy, bid, and inquire on over 16,000 design works on Artsy, the world’s largest online marketplace for art and design."
    )
  })

  it("returns the default title and description when there is no medium", () => {
    const medium = undefined
    const metadata = getMetadataForMedium(medium)

    expect(metadata.title).toBe("Collect | Artsy")
    expect(metadata.description).toBe(
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
    )
  })
})
