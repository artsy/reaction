import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { ArtworkSidebarClassificationFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarClassification"
import { ClassificationLink } from "../../ArtworkSidebar/ArtworkSidebarClassification"

jest.unmock("react-relay")

describe("ArtworkSidebarClassification", () => {
  let wrapper = null

  const getWrapper = async (
    response = {
      attribution_class: {
        short_description: "This is a unique work",
      },
    }
  ) => {
    return await renderRelayTree({
      Component: ArtworkSidebarClassificationFragmentContainer,
      query: graphql`
        query ArtworkSidebarClassification_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarClassification_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("for artwork with classification", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("displays classification", () => {
      expect(wrapper.html()).toContain("This is a unique work")
    })

    describe("modal pop up", () => {
      let modalWrapper: ReactWrapper

      beforeAll(() => {
        wrapper
          .find(ClassificationLink)
          .last()
          .simulate("click")
        wrapper.update()
        modalWrapper = wrapper.find("Modal")
      })

      it("shows a modal on Classification details click", () => {
        expect(modalWrapper.length).toEqual(1)
      })

      it("renders the proper modal content", () => {
        const html = modalWrapper.html()
        expect(html).toContain("Unique")
        expect(html).toContain("Limited edition")
        expect(html).toContain("Made-to-order")
        expect(html).toContain("Reproduction")
        expect(html).toContain("Editioned multiple")
        expect(html).toContain("Non-editioned multiple")
        expect(html).toContain("Ephemera")
      })
    })
  })

  describe("for artwork without classification", () => {
    beforeAll(async () => {
      wrapper = await getWrapper({ attribution_class: null })
    })

    it("does not render anything", () => {
      expect(wrapper.html()).toBeNull()
    })
  })
})
