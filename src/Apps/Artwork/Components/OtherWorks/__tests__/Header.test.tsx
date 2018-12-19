import { HeaderFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/Header.fixture"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"

describe("Header", () => {
  let wrapper: ReactWrapper

  const getWrapper = (response = HeaderFixture) => {}

  beforeAll(() => {
    wrapper = getWrapper()
  })

  it("", () => {
    //
  })
})
