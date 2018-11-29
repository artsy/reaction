import { GenesFixture } from "Apps/__tests__/Fixtures/Artist/Routes/Overview/Genes"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"
import { GenesFragmentContainer as Genes } from "../Components/Genes"

jest.unmock("react-relay")

describe("Genes", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: Genes,
      query: graphql`
        query Genes_Test_Query {
          artist(id: "pablo-picasso") {
            ...Genes_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => GenesFixture,
      },
    })
  }

  it("renders the related genes", async () => {
    wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Catty Art")
    expect(html).toContain("/gene/catty-art")
  })
})
