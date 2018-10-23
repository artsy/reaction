import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../../DevTools"
import { GenesFixture } from "../../../../__test__/Fixtures/Artist/Genes"
import { GenesFragmentContainer as Genes } from "../Components/Genes"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  const getWrapper = async (response = GenesFixture) => {
    return await renderRelayTree({
      Component: Genes,
      query: graphql`
        query Genes_Test_Query {
          artist(id: "pablo-picasso") {
            ...Genes_artist
          }
        }
      `,
      mockResolvers: { Artist: () => response },
    })
  }

  it("renders the related genes", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Catty Art")
    expect(html).toContain("/gene/catty-art")
  })
})
