import { GenesFixture } from "Apps/__test__/Fixtures/Artist/Routes/Overview/Genes"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"
import { GenesFragmentContainer as Genes } from "../Components/Genes"

describe("ArtistHeader", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <Genes artist={GenesFixture as any} />
      </RelayStubProvider>
    )
  }

  it("renders the related genes", async () => {
    wrapper = getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Catty Art")
    expect(html).toContain("/gene/catty-art")
  })
})
