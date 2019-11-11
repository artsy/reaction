import {
  ArtistBioTestQueryRawResponse,
  ArtistBioTestQueryResponse,
} from "__generated__/ArtistBioTestQuery.graphql"
import React from "react"

import { MockBoot, renderRelayTree } from "DevTools"
import { graphql } from "react-relay"
import { ArtistBioFragmentContainer as ArtistBio } from "../ArtistBio"

jest.unmock("react-relay")

describe("ArtistBio", () => {
  const biography_blurb = {
    text: '<a href="hi">hello how are you</a>',
    credit: "",
  }

  const getWrapper = () => {
    return renderRelayTree({
      Component: ({ bio }: ArtistBioTestQueryResponse) => (
        <MockBoot breakpoint="xl">
          <ArtistBio bio={bio} />
        </MockBoot>
      ),
      query: graphql`
        query ArtistBioTestQuery @raw_response_type {
          bio: artist(id: "unused") {
            ...ArtistBio_bio
          }
        }
      `,
      mockData: {
        bio: {
          id: "unused",
          biography_blurb,
        },
      } as ArtistBioTestQueryRawResponse,
    })
  }

  it("renders html text", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.html()).toContain(biography_blurb.text)
  })
})
