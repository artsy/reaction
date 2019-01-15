import { artistResponse as ArtistFixture } from "Apps/__tests__/Fixtures/SelectedCareerAchievements"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"
import { SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements } from "../SelectedCareerAchievements"

jest.unmock("react-relay")

describe("SelectedCareerAchievements", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
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
        artist: ArtistFixture,
      },
    })
  }

  it("renders selected career achievements", async () => {
    wrapper = await getWrapper()
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
})
