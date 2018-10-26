import { CurrentEventFixture } from "Apps/__test__/Fixtures/Artist/Routes/Overview/CurrentEvent"
import { CurrentEventFragmentContainer as CurrentEvent } from "Apps/Artist/Routes/Overview/Components/CurrentEvent"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

describe("ArtistHeader", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <CurrentEvent artist={CurrentEventFixture as any} />
      </RelayStubProvider>
    )
  }

  it("renders the current event information", async () => {
    wrapper = getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Currently at auction")
    expect(html).toContain("Live bidding begins soon")
    expect(html).toContain("/auction/catty-art-sale")
  })
})
