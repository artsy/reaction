import { IdentityVerificationPageTestQueryRawResponse } from "__generated__/IdentityVerificationPageTestQuery.graphql"
import { routes_IdentityVerificationPageQueryResponse } from "__generated__/routes_IdentityVerificationPageQuery.graphql"
import deepMerge from "deepmerge"
import { createTestEnv } from "DevTools/createTestEnv"
import { Location } from "found"
import React from "react"
import { graphql } from "react-relay"
import { IdentityVerificationPageQueryResponseFixture } from "../__fixtures__/routes_IdentitifcationPageQuery"
import IdentityVerificationPage from "../IdentityVerificationPage"
import { IdentityVerificationTestPage } from "./Utils/IdentityVerificationTestPage"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockLocation: Partial<Location> = {}
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

const setupTestEnv = ({
  location = mockLocation,
}: {
  location?: Partial<Location>
} = {}) => {
  return createTestEnv({
    TestPage: IdentityVerificationTestPage,
    Component: (props: routes_IdentityVerificationPageQueryResponse) => (
      <IdentityVerificationPage {...props} />
    ),
    query: graphql`
      query IdentityVerificationPageTestQuery @raw_response_type {
        me {
          ...IdentityVerificationPage_me @arguments(id: "idv-id")
        }
      }
    `,
    defaultData: IdentityVerificationPageQueryResponseFixture as IdentityVerificationPageTestQueryRawResponse,
  })
}

describe("IdentityVerification route", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe("for signed-in user", () => {
    it("allows an identity instance owner to begin identity verification", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      await page.clickStartVerification()
      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: "ClickedContinueToIdVerification",
        context_page: "Identity Verification page",
        context_page_owner_id: "identity-verification-id",
      })
    })
    it("shows a 404 page if the user does not own the identity verification", async () => {
      const env = setupTestEnv()

      const page = await env.buildPage({
        mockData: deepMerge(IdentityVerificationPageQueryResponseFixture, {
          me: {
            internalID: "some-guy",
            identityVerification: {
              userID: "someone-else",
            },
          },
        }),
      })
      expect(page.text()).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
    it.todo("shows a 404 page if the verification is not found")
  })
})
