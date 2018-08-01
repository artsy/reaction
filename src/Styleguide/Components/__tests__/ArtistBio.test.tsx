import { mount } from "enzyme"
import React from "react"
import { ArtistBio } from "../ArtistBio"

describe("ArtistBio", () => {
  const bio = {
    biography_blurb: {
      text: '<div id="found">hello how are you</div>',
    },
  }

  it("renders html text", () => {
    const wrapper = mount(<ArtistBio bio={bio} />)
    expect(wrapper.html()).toContain(bio.biography_blurb.text)
  })

  it("renders a ReadMore expandable area", () => {
    const wrapper = mount(<ArtistBio bio={bio} />)
    expect(wrapper.find("ReadMore").length).toBe(1)
  })

  it("triggers callback when clicked", done => {
    const wrapper = mount(
      <ArtistBio
        bio={bio}
        onReadMoreClicked={() => {
          done()
        }}
      />
    )
    wrapper.simulate("click")
  })
})
