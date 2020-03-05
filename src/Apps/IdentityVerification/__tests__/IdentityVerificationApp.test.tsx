import { IdentityVerificationAppTestQueryRawResponse } from "__generated__/IdentityVerificationAppTestQuery.graphql"
import { routes_IdentityVerificationAppQueryResponse } from "__generated__/routes_IdentityVerificationAppQuery.graphql"
import { ErrorModal } from "Components/Modal/ErrorModal"
import deepMerge from "deepmerge"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne } from "DevTools/RootTestPage"
import { Location } from "found"
import React from "react"
import { graphql } from "react-relay"
import { IdentityVerificationAppQueryResponseFixture } from "../__fixtures__/routes_IdentityVerificationAppQuery"
import { IdentityVerificationAppFragmentContainer } from "../IdentityVerificationApp"
import { IdentityVerificationAppTestPage } from "./Utils/IdentityVerificationAppTestPage"

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
    TestPage: IdentityVerificationAppTestPage,
    Component: (props: routes_IdentityVerificationAppQueryResponse) => (
      <IdentityVerificationAppFragmentContainer {...props} />
    ),
    query: graphql`
      query IdentityVerificationAppTestQuery @raw_response_type {
        me {
          ...IdentityVerificationApp_me @arguments(id: "idv-id")
        }
      }
    `,
    defaultData: IdentityVerificationAppQueryResponseFixture as IdentityVerificationAppTestQueryRawResponse,
    defaultMutationResults: {
      startIdentityVerification: {
        startIdentityVerificationResponseOrError: {
          identityVerificationFlowUrl: "www.identity.biz",
          mutationError: null,
        },
      },
    },
  })
}

describe("IdentityVerification route", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe("for signed-in user", () => {
    it("allows an identity verification instance's owner to view the landing page", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      expect(page.text()).toContain("Artsy identity verification")
    })

    it("shows a 404 page if the user does not own the identity verification", async () => {
      const env = setupTestEnv()

      const page = await env.buildPage({
        mockData: deepMerge(IdentityVerificationAppQueryResponseFixture, {
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

    describe("user enters verification flow", () => {
      it("user click on 'continue to verification' button is tracked", async () => {
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

      it("user is redirected to the verification flow on a successful mutation", async () => {
        window.location.assign = jest.fn()
        const env = setupTestEnv()
        const page = await env.buildPage()

        await page.clickStartVerification()

        expect(window.location.assign).toHaveBeenCalledWith("www.identity.biz")
      })

      it("user sees an error modal if the mutation fails", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()
        const badResult = {
          startIdentityVerification: {
            startIdentityVerificationResponseOrError: {
              mutationError: {
                error: "something bad :|",
                message: "oh noes",
                detail: "beep boop beep",
              },
            },
          },
        }
        env.mutations.useResultsOnce(badResult)

        await page.clickStartVerification()

        const errorModal = expectOne(page.find(ErrorModal))
        expect(errorModal.props().show).toBe(true)
        expect(page.text()).toContain(
          "Something went wrong. Please try again or contact verification@artsy.net."
        )
      })

      it("shows an error message on network failiure", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()
        env.mutations.mockNetworkFailureOnce()

        await page.clickStartVerification()

        const errorModal = expectOne(page.find(ErrorModal))
        expect(errorModal.props().show).toBe(true)
        expect(page.text()).toContain(
          "Something went wrong. Please try again or contact verification@artsy.net."
        )
      })

      xit("tracks mutation error", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()
        const badResult = {
          startIdentityVerification: {
            startIdentityVerificationResponseOrError: {
              mutationError: {
                error: "something bad :|",
                message: "oh noes",
                detail: "beep boop beep",
              },
            },
          },
        }
        env.mutations.useResultsOnce(badResult)

        await page.clickStartVerification()

        expect(mockPostEvent).toHaveBeenCalledWith({
          action_type: "some-error-type",
          context_page: "Identity Verification page",
          context_page_owner_id: "identity-verification-id",
        })
      })

      xit("tracks network failure error", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()
        env.mutations.mockNetworkFailureOnce()

        await page.clickStartVerification()

        expect(mockPostEvent).toHaveBeenCalledWith({
          action_type: "some-error-type",
          context_page: "Identity Verification page",
          // context_page_owner_id: "identity-verification-id",
        })
      })
    })
  })
})
