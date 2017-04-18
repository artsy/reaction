import * as React from "react"
import * as ReactTestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import { Inquiries } from "../index"

const inquiryProps = {
  user: {
    artwork_inquiries_connection: {
      edges: [
        {
          node: {
            id: "andy-warhol-skull",
            impulse_conversation_id: "1",
            artwork: {
              image: {
                url: "http://path.to.cat.pics",
              },
              artists: [{
                name: "Percy Z",
                href: "/percy-z",
              }],
            },
          },
        },
        {
          node: {
            id: "andy-warhol-skullz",
            impulse_conversation_id: null,
            artwork: {
              image: {
                url: "http://path.to.cat.pics",
              },
              artists: [{
                name: "Percy Z Without Conversation",
                href: "/percy-z-without-conversation",
              }],
            },
          },
        },
      ],
    },
  },
} as any

describe("login", () => {
  it("renders the inquiries listing", () => {
    const inquiries = renderer.create(<Inquiries {...inquiryProps}/>)
    expect(inquiries).toMatchSnapshot()
  })

  it("renders the artist information", () => {
    const inquiries = ReactTestUtils.renderIntoDocument(<Inquiries {...inquiryProps}/>)
    const aTags = ReactTestUtils.scryRenderedDOMComponentsWithTag(inquiries, "a")
    const artistLink = aTags.find(tag => tag.href === "/percy-z" && tag.textContent === "Percy Z")
    expect(artistLink).toBeTruthy()
    const noConvoLink = aTags.find(tag => tag.href === "/percy-z-without-conversation")
    expect(noConvoLink).toBeUndefined()
  })
})
