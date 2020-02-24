import {
  ConversationAppTestQueryRawResponse,
  ConversationAppTestQueryResponse,
} from "__generated__/ConversationAppTestQuery.graphql"
import { MockedConversation } from "Apps/__tests__/Fixtures/Conversation"
import { SystemContextProvider } from "Artsy"
import { MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"
import { ConversationAppFragmentContainer } from "../ConversationApp"

jest.unmock("react-relay")

const pageInfo: ConversationAppTestQueryRawResponse["me"]["conversationsConnection"]["pageInfo"] = {
  startCursor: "NQ",
  endCursor: "MQ",
  hasNextPage: true,
  hasPreviousPage: false,
}

const render = (me: ConversationAppTestQueryRawResponse["me"], user: User) =>
  renderRelayTree({
    Component: (props: ConversationAppTestQueryResponse) => (
      <ConversationAppFragmentContainer
        me={{
          ...me,
        }}
        {...props}
      />
    ),
    mockData: {
      me,
    } as ConversationAppTestQueryRawResponse,
    query: graphql`
      query ConversationAppTestQuery @raw_response_type {
        me {
          ...ConversationApp_me
        }
      }
    `,
    wrapper: children => (
      <MockBoot>
        <HeadProvider>
          <SystemContextProvider user={user}>{children}</SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    ),
  })

describe("Conversation app", () => {
  describe("User with admin privilages", () => {
    const userType = { type: "Admin" }
    describe("having previous conversations", () => {
      it("renders conversations with view details button", async () => {
        // TODO: revisit mocking and remove `artist_names` alias from PurchseHistory
        const mockMe = {
          id: "111",
          conversationsConnection: {
            edges: [{ node: MockedConversation, cursor: "absc" }],
            pageInfo,
          },
        }
        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("ConversationsAshkan Gallery-Title 1")
        const btn = component.find("ArrowRightCircleIcon")
        expect(btn.length).toBe(1)
      })
    })
    describe("without previous conversations", () => {
      it("shows No conversations", async () => {
        const mockMe = {
          id: "111",
          conversationsConnection: { edges: [], pageInfo },
        }
        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("No Conversations")
        const btn = component.find("Button")
        expect(btn.length).toBe(0)
      })
    })
  })
  describe("User without admin privilages", () => {
    it("gives error", async () => {
      const mockMe = {
        id: "111",
        conversationsConnection: {
          edges: [{ node: MockedConversation, cursor: "absc" }],
          pageInfo,
        },
      }
      const component = await render(mockMe, { type: "regular-user" })
      const text = component.text()
      expect(text).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
  })
})
