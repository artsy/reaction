import { mount } from "enzyme"
import React from "react"
import { ArtistBio } from "../ArtistBio"

describe("ArtistBio", () => {
  const bio = {
    biography_blurb: {
      text: '<a href="hi">hello how are you</a>',
    },
  }

  it("renders html text", () => {
    const wrapper = mount(<ArtistBio bio={bio} />)
    expect(wrapper.html()).toContain(bio.biography_blurb.text)
  })

  it("renders a ReadMore expandable area", () => {
    const wrapper = mount(<ArtistBio bio={bio} />)
    expect(wrapper.find("ReadMore").length).toBe(2)
  })

  // TODO: Chris, this test needs finishing.
  xit("triggers callback when clicked", done => {
    const wrapper = mount(
      <ArtistBio
        bio={bio}
        onReadMoreClicked={() => {
          done()
        }}
      />
    )
    wrapper.find("Container").simulate("click")
  })
})
