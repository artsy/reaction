import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkActions.fixture"
import { renderRelayTree } from "DevTools"
import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { ArtworkActionsFragmentContainer } from "../ArtworkActions"

jest.unmock("react-relay")

describe("ArtworkActions", () => {
  const getWrapper = async (response = ArtworkActionsFixture) => {
    return await renderRelayTree({
      Component: ArtworkActionsFragmentContainer,
      query: graphql`
        query ArtworkActions_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkActions_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  it("renders proper components", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("SaveButton").length).toBe(1)
    expect(wrapper.find("ShareButton").length).toBe(1)
  })

  describe("concerning SaveButton icon states", () => {
    it("renders heart icon when not sale", async () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale = null
      const wrapper = await getWrapper(data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Bell").length).toBe(0)
    })

    it("renders heart icon when sale is closed", async () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale.is_closed = true
      const wrapper = await getWrapper(data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Bell").length).toBe(0)
    })

    it("renders bell icon when sale is open", async () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale.is_closed = false
      const wrapper = await getWrapper(data)
      expect(wrapper.find("Heart").length).toBe(0)
      expect(wrapper.find("Bell").length).toBe(1)
    })
  })
})
