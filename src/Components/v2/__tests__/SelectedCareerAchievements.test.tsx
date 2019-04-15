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
            ...SelectedCareerAchievements_artist
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
    expect(text).toContain("Included in a major biennial")
  })

  it("renders selected career achievements if no auction results or partner highlights", async () => {
    wrapper = await getWrapper({
      ...ArtistFixture,
      auctionResults: null,
      highlights: {
        ...ArtistFixture.highlights,
        partners: null,
      },
    })
    const text = wrapper.text()

    expect(text).toContain("Selected career achievements")

    expect(text).toContain("Collected by a major institution")
    expect(text).toContain("Solo show at a major institution")
    expect(text).toContain("Group show at a major institution")
    expect(text).toContain("Reviewed by a major art publication")
    expect(text).toContain("Included in a major biennial")
  })

  it("doesn't render selected career achievements if no auction results, partner highlights, or insights", async () => {
    wrapper = await getWrapper({
      ...ArtistFixture,
      auctionResults: null,
      highlights: {
        ...ArtistFixture.highlights,
        partners: null,
      },
      insights: [],
    })
    const text = wrapper.text()

    expect(text).toBe(null)
  })

  it("doesn't render selected career achievements if no auction results or partner highlights and insights is null", async () => {
    wrapper = await getWrapper({
      ...ArtistFixture,
      auctionResults: null,
      highlights: {
        ...ArtistFixture.highlights,
        partners: null,
      },
      insights: null,
    })
    const text = wrapper.text()

    expect(text).toBe(null)
  })
})
