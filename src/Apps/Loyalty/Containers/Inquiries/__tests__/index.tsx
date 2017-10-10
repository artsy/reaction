import * as React from "react"
import * as TestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import { Artwork } from "../../../../../components/artwork"
import { Inquiries, Props } from "../index"

const inquiryProps: Props = {
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
              artists: [
                {
                  __id: "percy-z",
                  name: "Percy Z",
                  href: "/percy-z",
                },
              ],
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
              artists: [
                {
                  __id: "percy-z-convoless",
                  name: "Percy Z Without Conversation",
                  href: "/percy-z-without-conversation",
                },
              ],
            },
          },
        },
      ],
    },
  },
}

describe("inquiries", () => {
  it("renders the inquiries listing", () => {
    const inquiries = renderer.create(<Inquiries {...inquiryProps} />)
    expect(inquiries).toMatchSnapshot()
  })

  it("renders the artist information", () => {
    const inquiries = TestUtils.renderIntoDocument(<Inquiries {...inquiryProps} />) as Inquiries
    const aTags = TestUtils.scryRenderedDOMComponentsWithTag(inquiries, "a") as HTMLAnchorElement[]
    const artistLink = aTags.find(tag => tag.href === "/percy-z" && tag.textContent === "Percy Z")
    expect(artistLink).toBeTruthy()
    const noConvoLink = aTags.find(tag => tag.href === "/percy-z-without-conversation")
    expect(noConvoLink).toBeUndefined()
  })

  describe("concerning the submit button", () => {
    let inquiries: Inquiries
    let button: HTMLButtonElement

    beforeEach(() => {
      inquiries = TestUtils.renderIntoDocument(<Inquiries {...inquiryProps} />) as Inquiries
      button = TestUtils.findRenderedDOMComponentWithTag(inquiries, "button") as HTMLButtonElement
    })

    it("disables the submit button by default", () => {
      expect(button.disabled).toEqual(true)
    })

    it("enables the submit button when text is entered into the free-form textarea", () => {
      const textArea = TestUtils.findRenderedDOMComponentWithTag(inquiries, "textarea") as HTMLTextAreaElement

      textArea.value = "Mona Lisa, Don’t recall the dude’s name, Louvre Gift Shop"
      TestUtils.Simulate.change(textArea)
      expect(button.disabled).toEqual(false)

      textArea.value = " \n"
      TestUtils.Simulate.change(textArea)
      expect(button.disabled).toEqual(true)
    })

    it("enables the submit button when an inquiry is selected", () => {
      const artwork = TestUtils.findRenderedComponentWithType(inquiries, Artwork)
      const container = TestUtils.scryRenderedDOMComponentsWithTag(artwork, "div")[0]

      TestUtils.Simulate.click(container)
      expect(button.disabled).toEqual(false)

      TestUtils.Simulate.click(container)
      expect(button.disabled).toEqual(true)
    })
  })
})
