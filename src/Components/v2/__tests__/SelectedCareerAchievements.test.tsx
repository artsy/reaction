import { artistResponse as ArtistFixture } from "Apps/__tests__/Fixtures/SelectedCareerAchievements"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"
import { SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements } from "../SelectedCareerAchievements"

jest.unmock("react-relay")

describe("SelectedCareerAchievements", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (artistData, breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: SelectedCareerAchievements,
      query: graphql`
        query SelectedCareerAchievementsTestQuery {
          artist(id: "pablo-picasso") {
            ...SelectedCareerAchievementsArtistPage_artist
          }
        }
      `,
      mockData: {
        artist: artistData,
      },
    })
  }

  it("renders selected career achievements", async () => {
    wrapper = await getWrapper(ArtistFixture)
    const text = wrapper.text()

    expect(text).toContain("Selected career achievements")

    expect(text).toContain("Blue chip")
    expect(text).toContain("High auction record")
    expect(text).toContain("Collected by a major institution")
    expect(text).toContain("Solo show at a major institution")
    expect(text).toContain("Group show at a major institution")
    expect(text).toContain("Reviewed by a major art publication")
    expect(text).toContain("Participated in a major biennial")
  })

  it("renders selected career achievements if no auction results or partner highlights", async () => {
    ArtistFixture.auctionResults = null
    ArtistFixture.highlights.partners = null
    wrapper = await getWrapper(ArtistFixture)
    const text = wrapper.text()

    expect(text).toContain("Selected career achievements")

    expect(text).toContain("Collected by a major institution")
    expect(text).toContain("Solo show at a major institution")
    expect(text).toContain("Group show at a major institution")
    expect(text).toContain("Reviewed by a major art publication")
    expect(text).toContain("Participated in a major biennial")
  })

  it("doesn't render selected career achievements if no auction results, partner highlights, or insights", async () => {
    ArtistFixture.auctionResults = null
    ArtistFixture.highlights.partners = null
    ArtistFixture.insights = null
    wrapper = await getWrapper(ArtistFixture)
    const text = wrapper.text()

    expect(text).toBe(null)
  })
})
