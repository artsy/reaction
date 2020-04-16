import React from "react"
import { graphql } from "react-relay"

import { createTestEnv } from "DevTools/createTestEnv"

import { UserSettingsTwoFactorAuthenticationQueryResponse } from "__generated__/UserSettingsTwoFactorAuthenticationQuery.graphql"
import { UserSettingsTwoFactorAuthenticationFragmentContainer } from "../UserSettingsTwoFactorAuthentication"
import { UserSettingsTestPage } from "./Utils/UserSettingsTestPage"

jest.unmock("react-relay")
HTMLCanvasElement.prototype.getContext = jest.fn()

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: UserSettingsTestPage,
    Component: (props: UserSettingsTwoFactorAuthenticationQueryResponse) => (
      <UserSettingsTwoFactorAuthenticationFragmentContainer {...props} />
    ),
    query: graphql`
      query UserSettingsTwoFactorAuthenticationTestQuery @raw_response_type {
        me {
          ...UserSettingsTwoFactorAuthentication_me
        }
      }
    `,
    defaultData: {
      me: {
        hasSecondFactorEnabled: false,
        appSecondFactors: [],
        smsSecondFactors: [],
        backupSecondFactors: [],
      },
    },
  })
}

describe("UserSettingsTwoFactorAuthentication ", () => {
  it("shows current 2FA enrollment status", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    expect(page.text()).toContain("Two-factor Authentication")
    expect(page.text()).toContain("Set up")

    await page.clickSetupButton()

    expect(page.text()).toContain("Enable 2FA")
    expect(page.text()).toContain("Turn on")
  })
})
