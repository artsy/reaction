import { ArtistArtworkGridFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkGrids/ArtistArtworkGrid.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Header } from "../Header"

describe("Header", () => {
  let wrapper: ReactWrapper

  const getWrapper = (response = ArtistArtworkGridFixture) => {}

  beforeAll(() => {
    wrapper = getWrapper()
  })

  it("", () => {
    //
  })
})
