import { ArtistCard_artist } from "__generated__/ArtistCard_artist.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import { set } from "lodash/fp"
import React from "react"
import { Breakpoint } from "Utils/Responsive"
import { ArtistCard, LargeArtistCard, SmallArtistCard } from "../ArtistCard"

describe("ArtistCard", () => {
  const props: { user: null; artist: ArtistCard_artist } = {
    user: null,
    artist: {
      image: {
        cropped: {
          url: "https://picsum.photos/110/110/?random",
        },
      },
      href: "/artist/francesca-dimattio",
      name: "Francesca DiMattio",
      formatted_nationality_and_birthday: "American, b. 1979",
      id: "percy",
      " $fragmentRefs": null,
      " $refType": null,
    },
  }

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in MockBoot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <ArtistCard {...props} />
      </MockBoot>
    )
    expect(small.find(SmallArtistCard).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <ArtistCard {...props} />
      </MockBoot>
    )
    expect(large.find(LargeArtistCard).length).toEqual(1)
  })

  it("hides avatar if no image is provided", () => {
    ;["xs" as Breakpoint, "lg" as Breakpoint].forEach(breakpoint => {
      const updatedProps: any = set("artist.image", undefined, props)

      const wrapper = mount(
        <MockBoot breakpoint={breakpoint}>
          <ArtistCard {...updatedProps} />
        </MockBoot>
      )

      expect(wrapper.find("Avatar").length).toEqual(0)
    })
  })
})
